from flask import Flask
from .routes import register_routes
from .config import config
from flask_cors import CORS
from flask_jwt_extended import JWTManager



def create_app():
    app = Flask(__name__)
    app.config.from_object(config)
    CORS(app)
    register_routes(app)
    JWTManager(app)
    from .extensions import db, migrate, bcrypt
    from .database import models
    db.init_app(app)
    migrate.init_app(app,db)
    bcrypt.init_app(app)
    

    return app