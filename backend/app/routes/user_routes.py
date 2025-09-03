from flask import jsonify, request, Blueprint
from ..database.models import User, Task, UserTasks
from ..extensions import db

user_bp = Blueprint("user_bp", __name__)
