from ..extensions import db

#user
class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(255))
    points = db.Column(db.Integer)
    role = db.Column(db.String(20), default='user')
    

    events = db.relationship('Event', backref='user')
    user_tasks = db.relationship('UserTasks', backref='user')
    participants = db.relationship('EventParticipants', backref='users')

    def __init__(self, name, password, points=0):
        self.name = name
        self.password = password
        self.points = points

#event
class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    host = db.Column(db.Integer, db.ForeignKey('users.id'))
    date_created = db.Column(db.DateTime, default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    title = db.Column(db.String(100), nullable=False, unique=True)
    description = db.Column(db.Text)
    mode = db.Column(db.String(50))
    deadline = db.Column(db.DateTime)

    participants = db.relationship('EventParticipants', backref='event')

    def __init__(self, host, title, description=None, mode=None, deadline=None):
        self.host = host
        self.title = title
        self.description = description
        self.mode = mode
        self.deadline = deadline

#Participants
class EventParticipants(db.Model):
    __tablename__ = 'participants'
    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    joined_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    def __init__(self, event_id, user_id, joined_at=None):
        self.event_id = event_id
        self.user_id = user_id
        if joined_at:
            self.joined_at = joined_at

#task
class Task(db.Model):
    __tablename__ = 'task'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    reward = db.Column(db.Integer)
    is_daily = db.Column(db.Boolean, default=False)

    user_tasks = db.relationship('UserTasks', backref='task')

    def __init__(self, title, reward, is_daily=False):
        self.title = title
        self.reward = reward
        self.is_daily = is_daily

#completion log
class UserTasks(db.Model):
    __tablename__ = 'user_tasks'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    task_id = db.Column(db.Integer, db.ForeignKey('task.id'))
    is_completed = db.Column(db.Boolean, default=False)
    completed_at = db.Column(db.DateTime)

    def __init__(self, user_id, task_id, is_completed=False, completed_at=None):
        self.user_id = user_id
        self.task_id = task_id
        self.is_completed = is_completed
        self.completed_at







