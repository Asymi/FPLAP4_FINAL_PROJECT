from flask import Flask, request, jsonify, url_for, render_template
from flask_cors import CORS
from werkzeug import exceptions 
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
from itsdangerous import URLSafeTimedSerializer, SignatureExpired
from environs import Env
from forms import ResetPasswordForm
import os




# Makes a time sensitive key
serialiser = URLSafeTimedSerializer('SECRET KEY')



env = Env()
env.read_env()
app = Flask(__name__)




# Mail configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = env('EMAIL_USER')
app.config['MAIL_PASSWORD'] = env('EMAIL_PASSWORD')
mail = Mail(app)




PG_USER = env('PG_USER')
PG_PASSWORD = env('PG_PASSWORD')
ENV = 'dev'
if ENV == 'dev':
    app.debug = True
    app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{PG_USER}:{PG_PASSWORD}@localhost/travel'
else:
    app.debug = False
    app.config['SQLALCHEMY_DATABASE_URI'] = ''

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'secret'




# Initialisation
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app, resources={r"/*": {"origins": "*"}})




# User table
class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100))
    password = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)
    confirmed = db.Column(db.Boolean)

    def __init__(self, username, password, email, confirmed):
        self.username = username
        self.password = password
        self.email = email
        self.confirmed = confirmed

# Countries table
class Countries(db.Model):
    __tablename__ = 'countries'
    id = db.Column(db.Integer, primary_key=True)
    country = db.Column(db.String(50))
    
    def __init__(self, country):
        self.country = country

# Activities table
class Activities(db.Model):
    __tablename__ = 'activities'
    id = db.Column(db.Integer, primary_key=True)
    country = db.Column(db.String)
    name = db.Column(db.String(200))
    category = db.Column(db.String(200))
    opening_hours = db.Column(db.String(200))
    price = db.Column(db.Integer)
    provider = db.Column(db.String(200))
    address = db.Column(db.String(300))
    phone_number = db.Column(db.String(30))
    
    def __init__(self, country, name, category, opening_hours, price, provider, address, phone_number):
        self.country = country
        self.name = name
        self.category = category
        self.opening_hours = opening_hours
        self.price = price
        self.provider = provider
        self.address = address
        self.phone_number = phone_number

# Likes table
class Likes(db.Model):
    __tablename__ = 'likes'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    activity_id = db.Column(db.Integer)
    
    def __init__(self, user_id, activity_id):
        self.user_id = user_id
        self.activity_id = activity_id

# Categories tables
class Categories(db.Model):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(300))

    def __init__(self, category):
        self.category = category



# Routes
@app.route('/')
def home():
    return 'Hello'


# Authorisation and authentication routes
@app.route('/signup', methods=['GET','POST'])
def sign_up():
    if request.method == 'POST':
        username = request.get_json()['username']
        # print(username)
        email = request.get_json()['email']
        password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
        
        # Check if email is unique
        if db.session.query(Users.email).filter(Users.email == email).count() == 0:
            data = Users(username, password, email, False)
            db.session.add(data)
            db.session.commit()

            # Email Verfication
            token = serialiser.dumps(email, salt='verify-email')
            link = url_for('confirm_email', token=token, _external=True)
            msg = Message(subject='Confirm Your Email Address',
                            sender=app.config.get('MAIL_USERNAME'),
                            recipients=["yassine.benlamkadem@gmail.com"])
            msg.body = f"Please verify your email address by clicking on the link: {link}"
            mail.send(msg)
        
            return jsonify({'success': 'Thanks for signing up!'})
        else:
            return jsonify({'failure': 'Email unavailable, please choose another'})

    return jsonify({"message": 'signup' })



@app.route('/confirm_email/<token>')
def confirm_email(token):
    try: 
        email = serialiser.loads(token, salt='verify-email', max_age=3600)
        # Update database to mark email as confirmed
        user = db.session.query(Users).filter(Users.email == email).first()
        user.confirmed = True
        db.session.commit()
    except SignatureExpired:
        return render_template('expired.html')
    return render_template('confirmed.html')



@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.get_json()['email']
        password = request.get_json()['password']

        # Validating email to see if it exists in database
        if db.session.query(Users.email).filter(Users.email == email).count() == 1:
            
            # Validate email is confirmed
            if db.session.query(Users.confirmed).filter(Users.email == email).first()[0] == True:
                # Get user data from database to create identity
                hashed_password = db.session.query(Users.password).filter(Users.email == email).first()[0]
                email = db.session.query(Users.email).filter(Users.email == email).first()[0]
                username = db.session.query(Users.username).filter(Users.email == email).first()[0]

                if bcrypt.check_password_hash(hashed_password, password):
                    access_token = create_access_token(identity = {
                        'username': username,
                        'email': email
                    })
                    result = jsonify({'token': access_token})
                else:
                    result = jsonify({"error":"Invalid username or password"})
            else: 
                result = jsonify({"conf_error":"Please confirm email address before logging in"})
        else: result = jsonify({"error":"Invalid username or password"})
    return result



@app.route('/forgot_password', methods=['POST'])
def forgot_password():
    if request.method == 'POST':
        email = request.get_json()['email']

        token = serialiser.dumps(email, salt='reset-password')
        link = url_for('reset_password', token=token, _external=True)
        msg = Message(subject='Reset Your Password',
                        sender=app.config.get('MAIL_USERNAME'),
                        recipients=["yassine.benlamkadem@gmail.com"])
        msg.body = f"You are recieving this email because you requested to reset your password on. Click the link below to reset your password. If you did not request this, please ignore this message. {link}"
        mail.send(msg)
        return jsonify({"message": "Password reset link sent"})


# Include password validations later
@app.route('/reset_password/<token>', methods=['GET', 'POST'])
def reset_password(token):
    email = serialiser.loads(token, salt='reset-password', max_age=3600)
    form = ResetPasswordForm(request.form)
    
    if request.method == 'POST':
        # Get new password from form and encrypt it
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')

        user = db.session.query(Users).filter(Users.email == email).first()
        user.password = hashed_password
        db.session.commit()
        return render_template('reset_confirm.html')
    else:
        return render_template('reset.html', form=form, token=token)



# API ROUTES
# User dashboard route
@app.route('/dashboard', methods=['GET'])
@jwt_required
def dashboard():
    current_user = get_jwt_identity()
    email = current_user['email']
    username = current_user['username']

    # Get user's id and all their likes activities
    user_id = db.session.query(Users).filter(Users.email == email).first().id
    liked_activities = db.session.query(Likes).filter(Likes.user_id == user_id).all()

    # Save activity_ids of user's liked activities
    user_activities= []
    for activity in liked_activities:
        # user_activities_ids.append(activity.activity_id)
        row = db.session.query(Activities).filter(Activities.id == activity.activity_id).first().__dict__
        del row['_sa_instance_state']
        user_activities.append(row)
    
    response = {
        "username": username,
        "user_activities": user_activities
    }
    return jsonify(response), 200


# Admin route to add activities to database
@app.route('/add_activity', methods=['POST'])
@jwt_required
def add_activity():
    current_user = get_jwt_identity()
    email = current_user['email']

    if email == 'fplap4project@gmail.com':
        country, name, category, opening_hours, price, provider, address, phone_number = request.get_json()['country'], request.get_json()['name'], request.get_json()['category'], request.get_json()['opening_hours'], request.get_json()['price'], request.get_json()['provider'], request.get_json()['address'], request.get_json()['phone_number']
        data = Activities(country, name, category, opening_hours, price, provider, address, phone_number)
        db.session.add(data)
        db.session.commit()
        return jsonify({"message":"Activity added successfully"})
    else: 
        return jsonify({"message":"This route is not accessible"})

# Route to check if an activity is liked
@app.route('/is_liked', methods=['POST'])
@jwt_required
def is_liked():
    activity_id = request.get_json()['activity_id']
    current_user = get_jwt_identity()

    email = current_user['email']
    user_id = db.session.query(Users).filter(Users.email == email).first().id

    search_result = db.session.query(Likes).filter(Likes.user_id == user_id).filter(Likes.activity_id == activity_id).first()
    if search_result:
        result = True
    else: 
        result = False
    return jsonify({"user_likes": result })

# Route to add activities to user's likes
@app.route('/like_activity', methods=['POST'])
@jwt_required
def like_activity():
    current_user = get_jwt_identity()
    email = current_user['email']
    user_id = db.session.query(Users).filter(Users.email == email).first().id
    activity_id = request.get_json()['activity_id']

    data = Likes(user_id, activity_id)
    db.session.add(data)
    db.session.commit()
    return jsonify({"message": "Activity added to user's likes successfuly"})


# Route to add activities to user's likes
@app.route('/unlike_activity', methods=['POST'])
@jwt_required
def unlike_activity():
    current_user = get_jwt_identity()
    email = current_user['email']
    user_id = db.session.query(Users).filter(Users.email == email).first().id
    activity_id = request.get_json()['activity_id']

    db.session.query(Likes).filter(Likes.user_id == user_id).filter(Likes.activity_id == activity_id).delete(synchronize_session=False)
    db.session.commit()
    return jsonify({"message": "Activity removed from user's likes successfuly"})


# Populate country table
@app.route('/add_countries', methods=['GET'])
@jwt_required
def add_countries():
    current_user = get_jwt_identity()
    email = current_user['email']

    if email == 'fplap4project@gmail.com':
        countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"]
        
        for country in countries:
            data = Countries(country)
            db.session.add(data)
        db.session.commit()

        return jsonify({"message": "Countries successfully added"})
    else:
        return jsonify({"message":"This route is not accessible"})


# Populate category table
@app.route('/add_categories', methods=['GET'])
@jwt_required
def add_categories():
    current_user = get_jwt_identity()
    email = current_user['email']

    if email == 'fplap4project@gmail.com':
        categories = ["Sights", "Arts", "Food", "Outdoors", "Sports", "Culture", "History"]

        for category in categories:
            data = Categories(category)
            db.session.add(data)

        db.session.commit()
        return jsonify({"message": "Categories successfully added"})
    else:
        return jsonify({"message":"This route is not accessible"})


# Route to get countries
@app.route('/countries', methods=['GET'])
def countries():
    countries = db.session.query(Countries).all()

    send_countries = []
    for country in countries:
        row = country.__dict__
        del row['_sa_instance_state']
        send_countries.append(row)

    return jsonify(send_countries)


# Route for countries/countryslug, basically filter activities by country
@app.route('/countries/<country>', methods=['GET'])
def country_activities(country):
    country.replace("%20"," ")
    categories = ["Sights", "Arts", "Food", "Outdoors", "Sports", "Culture", "History"]
    
    response = []
    for category in categories:
        results = db.session.query(Activities).filter(Activities.country == country).filter(Activities.category == category).all()
        
        result_dict = {
            "category": category,
            "activities": []
        }

        for result in results:
            row = result.__dict__
            del row['_sa_instance_state']
            result_dict["activities"].append(row)
        
        response.append(result_dict)
        print(response)
    return jsonify(response)

# Route for countries/countryslug/categoryslug, basically filter activities by country then filter by category
if __name__ == '__main__':
    app.run(debug=True)