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
    username = db.Column(db.String(100), unique=True)
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
    name = db.Column(db.String(200))
    category = db.Column(db.String(200))
    opening_hours = db.Column(db.String(200))
    price = db.Column(db.Integer)
    provider = db.Column(db.String(200))
    address = db.Column(db.String(300))
    phone_number = db.Column(db.String(30))
    
    def __init__(self, name, category, opening_hours, price, provider, address, phone_number):
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
    user_id = db.Column(db.Integer, primary_key=True)
    activity_id = db.Column(db.Integer)
    
    def __init__(self, user_id, activity_id):
        self.user_id = user_id
        self.activity_id = activity_id
        

# Routes
@app.route('/')
def home():
    return 'Hello'


# Sending encrypted password???
@app.route('/signup', methods=['GET','POST'])
def sign_up():
    if request.method == 'POST':
        username = request.get_json()['username']
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
            # return '<p>The email you have entered is {}'.format(email, token)

            # Send mail for later
            return jsonify({'success': 'Thanks for signing up!'})
        else:
            return jsonify({'failure': 'Email unavailable, please choose another'})
    else:
        return "Signup route"



@app.route('/confirm_email/<token>')
def confirm_email(token):
    try: 
        email = serialiser.loads(token, salt='verify-email', max_age=3600)
        # Update database to mark email as confirmed
        user = db.session.query(Users).filter(Users.email == email).first()
        user.confirmed = True
        db.session.commit()
        print(email)
    except SignatureExpired:
        # return '<p>The e
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
                    # result = jsonify({"success":"Successful login"})
                else:
                    result = jsonify({"error":"Invalid username or password"})
            else: 
                result = jsonify({"conf_error":"Please confirm email address before logging in"})
        else: result = jsonify({"error":"Invalid username or password"})
    return result



@app.route('/profile', methods=['GET'])
@jwt_required
def profile():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as = current_user), 200



@app.route('/forgotpassword', methods=['GET', 'POST'])
def forgot_password():
    return 'Forgot password!'

if __name__ == '__main__':
    app.run(debug=True)