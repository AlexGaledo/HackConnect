from .auth_routes import auth_bp
from .event_routes import events_bp
from .user_routes import user_bp
from .task_routes import task_bp

def register_routes(app):
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(events_bp, url_prefix='/events')
    app.register_blueprint(user_bp, url_prefix='/user')
    app.register_blueprint(task_bp, url_prefix='/tasks')

    return