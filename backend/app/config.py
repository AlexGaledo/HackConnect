from dotenv import load_dotenv
import os

load_dotenv()

class config:
    sql_url = os.getenv('external_url')
    SQLALCHEMY_DATABASE_URI = sql_url
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('jwt_secret_key')