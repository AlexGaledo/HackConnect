from flask import jsonify, request, Blueprint
from ..extensions import db
from ..database.models import Event, EventParticipants, User
from flask_jwt_extended import jwt_required
import traceback, logging
from  .utils.route_utils import already_joined

events_bp = Blueprint('events_bp', __name__)

#get/load all events
@events_bp.route('/getEvents',methods = ['GET'])
@jwt_required()
def getEvents():
    try:
        events = Event.query.all()
        events_list = [
            {
                "id": event.id,
                "title": event.title,
                "description": event.description,
                "mode": event.mode,
                "deadline": event.deadline,
                "date_created": event.date_created,
                "date_modified": event.date_modified,
                "host_id": event.host_id
            }
            for event in events
        ]
        return jsonify(events_list), 200
    except Exception as e:
        return jsonify({"response":"something went wrong"}), 500


#add event
@events_bp.route('/addEvent', methods = ['POST'])
@jwt_required()
def addEvent():
    try:
        data = request.get_json()
        new_event = Event(
            host_id = data.get('user_id'), 
            title = data.get('title'),
            description = data.get('description'), 
            mode = data.get('mode'), 
            deadline = data.get('deadline')) 
        db.session.add(new_event)
        db.session.commit()
        event_info = {
            "id": new_event.id,
            "title": new_event.title,
            "description": new_event.description,
            "mode": new_event.mode,
            "deadline": new_event.deadline,
            "date_created": new_event.date_created,
            "date_modified": new_event.date_modified,
            "host_id": new_event.host_id
        }    
        return jsonify({"response":"event successfully created",
                        "event_info":event_info}), 201
    except Exception as e:
        logging.error(traceback.format_exc())
        db.session.rollback()
        return jsonify({"response":"something went wrong"}), 500
    

#find event 
@events_bp.route('/findEvent', methods=['POST'])
@jwt_required()
def findEvent():
    data = request.get_json()
    events = Event.query.filter_by(title = data.get('title')).all()
    events_info = [
        {
            "id": event.id,
            "title": event.title,
            "description": event.description,
            "mode": event.mode,
            "deadline": event.deadline,
            "date_created": event.date_created,
            "date_modified": event.date_modified,
            "host_id": event.host_id
        }
        for event in events
    ]
    return jsonify({"event_info": events_info}), 200


#delete event
@events_bp.route('/deleteEvent/<int:event_id>', methods=['DELETE'])
@jwt_required()
def deleteEvent(event_id):
    try:
        event = Event.query.get(event_id)
        if event:
            db.session.delete(event)
            db.session.commit()
            return jsonify({"response":"event successfully deleted"}), 200
        else:
            return jsonify({"response":"event not found"}), 404
    except Exception as e:
        logging.error(traceback.format_exc())
        db.session.rollback()
        return jsonify({"response":"something went wrong"}), 500
    

#join event
@events_bp.route('/joinEvent/<int:event_id>/<int:user_id>', methods=['POST'])
@jwt_required()
def joinEvent(event_id, user_id):
    try:
        user = User.query.get(user_id)
        event = Event.query.get(event_id)
    
        if event and user:
            if already_joined(user_id, event_id):
                return jsonify({"response":"user is already in the event"}), 409
            
            new_participant = EventParticipants(event.id, user.id)
            db.session.add(new_participant)
            db.session.commit()
            participant_info ={
                "id":new_participant.id,
                "event_id":new_participant.event_id,
                "user_id":new_participant.user_id,
                "joined_at":new_participant.joined_at
            }

        return jsonify({"response":"Successfully joined the Event",
                        "participant_info":participant_info}), 201
    except Exception as e:
        db.session.rollback()
        logging.error(traceback.format_exc())
        return jsonify({"response":"something went wrong"}), 500
    

    








