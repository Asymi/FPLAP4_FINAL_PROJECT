from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug import exceptions 
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)





app = Flask(__name__)
CORS(app)

ENV = 'dev'
if ENV == 'dev':
    app.debug = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Ch33seYB@localhost/travel'
else:
    app.debug = False
    app.config['SQLALCHEMY_DATABASE_URI'] = ''

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'secret'

# Initialisation
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)





# User table
class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)

    def __init__(self, username, password, email):
        self.username = username
        self.password = password
        self.email = email

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
        # get_json() is used to get the body of a request
        username = request.get_json()['username']
        email = request.get_json()['email']
        password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
        data = Users(username, password, email)
        db.session.add(data)
        db.session.commit()
        # Send mail for later
        return jsonify({'message': 'Thanks for signing up!'})
    else:
        return "Sign up"

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.get_json()['email']
        password = request.get_json()['password']

        # Get user data from database to create identity
        hashed_password = db.session.query(Users.password).filter(Users.email == email).first()[0]
        email = db.session.query(Users.email).filter(Users.email == email).first()[0]
        username = db.session.query(Users.username).filter(Users.email == email).first()[0]

        if bcrypt.check_password_hash(hashed_password, password):
            access_token = create_access_token(identity = {
                'username': username,
                'email': email
            })
            result = access_token
            # result = jsonify({"success":"Successful login"})
        else:
            result = jsonify({"error":"Invalid username or password"})
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