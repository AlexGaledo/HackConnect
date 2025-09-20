from flask import jsonify, request
from ..database.models import User
from ..extensions import db, bcrypt
from flask import Blueprint
import logging ,traceback
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import create_access_token, create_refresh_token


auth_bp = Blueprint('auth', __name__)

#signup route
@auth_bp.route('/sign-up',methods = ['POST'])
def signup():
    data = request.get_json()
    hashed_pw = bcrypt.generate_password_hash(data.get('password')).decode('utf-8')
    try:
        new_user = User( 
        name=data.get('username'),email=data.get('email'), password = hashed_pw, points = 0)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({
            "response":"User Created Successfully","username":data.get('username')}), 201
    except IntegrityError as e:
        logging.error(traceback.format_exc())
        db.session.rollback()
        return jsonify({"response":"Username already exists"}), 409
    except Exception as e:
        logging.error(traceback.format_exc())
        db.session.rollback()
        return jsonify({"response":"something went wrong"}), 500
    
#signin route
@auth_bp.route('/login',methods = ['POST'])
def login():
    data = request.get_json()
    try:
        user = User.query.filter_by(name = data.get('username')).first()
        if user and bcrypt.check_password_hash(user.password,data.get('password')):
            refresh_token = create_refresh_token(identity=data.get('username'))
            access_token = create_access_token(identity=data.get('username'))
            return jsonify({"response":"Login Successful",
                            "user_id":user.id,
                            "username":data.get('username'),
                            "email":user.email,
                            "access_token":access_token,
                            "refresh_token":refresh_token}), 200
        else:
            return jsonify({"response":"Invalid username or password"}), 401
    except Exception as e:
        logging.error(traceback.format_exc())
        return jsonify({"response":"something went wrong"}), 500
    

    

    


