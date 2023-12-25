from flask import Blueprint, abort, request, Response, current_app, jsonify
from model.model_entrar import status_participacion, entrar_torneo, salir_torneo
from model.model_participante import participante_exists_by_id
from model.model_torneo import get_torneo_by_id, torneo_exists_by_id

entrar = Blueprint('entrar', __name__)

@entrar.route('/is-joined', methods=['POST', 'GET'])
def is_joined():
    data = request.get_json()
    idTournament = data.get('idTournament')
    idUser = data.get('idUser')
    status = status_participacion(idUser,idTournament)
    return jsonify({'status': status})


@entrar.route('/join', methods=['POST', 'GET'])
def join():
    data = request.get_json()
    idTournament = data.get('idTournament')
    idUser = data.get('idUser')

    user_exists = participante_exists_by_id(idUser)
    torneo_exists = torneo_exists_by_id(idTournament)

    if not user_exists or not torneo_exists:
        return jsonify({'status': False})

    status = entrar_torneo(idUser,idTournament)
    return jsonify({'status': status})

@entrar.route('/leave', methods=['POST', 'GET'])
def leave():
    data = request.get_json()
    idTournament = data.get('idTournament')
    idUser = data.get('idUser')

    user_exists = participante_exists_by_id(idUser)
    torneo_exists = torneo_exists_by_id(idTournament)

    if not user_exists or not torneo_exists:
        return jsonify({'status': False})

    status = salir_torneo(idUser,idTournament)
    return jsonify({'status': status})