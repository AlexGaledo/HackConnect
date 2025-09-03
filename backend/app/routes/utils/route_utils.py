


from ...database.models import EventParticipants, UserTasks

#check if user is already joined
def already_joined(event_id, user_id):
    participant = EventParticipants.query.filter_by(user_id = user_id, event_id = event_id).first()

    return participant if participant is not None else False


#check if task is done by the user already
def isTaskDone(user_id, task_id):
    task = UserTasks.query.filter_by(user_id = user_id, task_id = task_id, is_completed = True).first()

    return task is not None