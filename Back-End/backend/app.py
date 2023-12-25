from flask import Flask, Blueprint, request, abort, jsonify, Response, current_app
from flask_cors import CORS

from alchemyClasses import db
from authController import auth
from tourneyController import tourney
from adminController import admin
from participantController import part
from entrarController import entrar

app = Flask(__name__)

app.register_blueprint(tourney)
app.register_blueprint(auth)
app.register_blueprint(admin)
app.register_blueprint(part)
app.register_blueprint(entrar)

# Server P - User esta configuración si desea usar la base de datos remota.
# Notificar al equipo para poder activar la base de datos remota y puedan probarla
# app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://devEvilDev:developerEHT@143.244.208.42/EvilHubTourney"

# Server Docker
# app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://devEvilDev:developerEHT@db/EvilHubTourney"

# Server localhost
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:root@localhost:3306/EvilHubTourney"

app.config.from_mapping(
    SECRET_KEY='dev'
)
db.init_app(app)

cors = CORS(app)

correo_super_administrador = 'c.cabrera@ciencias.unam.mx'

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)