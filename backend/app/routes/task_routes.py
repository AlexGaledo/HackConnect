from flask import jsonify, Blueprint, request
from ..database.models import User, Task, UserTasks
from ..extensions import db
from ..routes.utils.route_utils import isTaskDone
import logging, traceback

task_bp = Blueprint("task_bp", __name__)

#getAvailableTasks
@task_bp.route("/getTasks/<int:user_id>",methods=['GET'])
def getTasks(user_id):
    try:
        user = User.query.get(user_id)
        if user is None:
            return jsonify({"response":"user not found"}), 404
        
        tasks = Task.query.all()

        _tasks = [{
            'id':task.id,
            'title':task.title,
            'reward':task.reward,
            'is_completed':isTaskDone(user_id, task.id) != False
        }for task in tasks]

        return jsonify({"available_tasks":_tasks}), 200
        
    except Exception as e:
        logging.error(traceback.format_exc())
        return jsonify({"response":"something weth wrong"}), 500


#completeTask
@task_bp.route("/completeTask/<int:user_id>/<int:task_id>", methods=['POST'])
def completeTask(user_id, task_id):
    task = Task.query.get(task_id)
    user = User.query.get(task_id)
    
    try:
        if not user or not task:
            return jsonify({"response":"task or user not found"}), 404
        
        
        if isTaskDone(user_id, task_id):
            return jsonify({"response":"Task is already completed."}), 409
        
        done = UserTasks(user_id=user.id, task_id=task.id, is_completed=True)
        db.session.add(done)
        user.points += task.reward
        db.session.commit()

        return jsonify({"response":"task completed",
                        "total_points":user.points}), 200
        
    except Exception as e:
        logging.error(traceback.format_exc())
        db.session.rollback()
        return jsonify({"response":"something went wrong"}), 500
    
#Note: Daily tasks reset logic is not implemented yet.


