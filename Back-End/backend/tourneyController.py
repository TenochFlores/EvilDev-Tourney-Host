from flask import Blueprint, abort, request, Response, current_app, jsonify

from model.model_tourney import get_all, get_by_id, create_or_update_tourney, \
    delete_tourney_by_id

import model.model_torneo as m_tourney

tourney = Blueprint('tourney', __name__)


@tourney.route('/get-tournaments', methods=['POST', 'GET'])
def get_tournaments():

    torneos = m_tourney.get_all_torneos()

    torneos = [{
        "id_torneo": t.id_torneo,
        "id_administrador": t.id_administrador,
        "foto": t.foto,
        "nombre_torneo": t.nombre_torneo,
        "reglas": t.reglas,
        "consola": t.consola,
        "nombre_videojuego": t.nombre_videojuego,
        "numero_participantes": t.numero_participantes,
        "fecha_inicio": t.fecha_inicio,
        "fecha_fin": t.fecha_fin
        } for t in torneos]

    return jsonify({"data": torneos})


@tourney.route("/api/tourney/")
def all_tourneys():
    return get_all()


@tourney.route("/api/tourney/<id>")
def get_tourney_by_id(id):
    tourney_dto = get_by_id(id, current_app.logger)
    if tourney_dto is None:
        abort(404)
    return tourney_dto


@tourney.route("/api/tourney/", methods=["POST", "PUT"])
def create_or_update_tourney_controller():
    tourney_dto = request.get_json()
    success = create_or_update_tourney(tourney_dto, current_app.logger)

    if success:
        return Response(status=200)
    return abort(500)


@tourney.route("/api/tourney/<id>", methods=["DELETE"])
def delete_tourney(id):
    res = delete_tourney_by_id(id)

    if not res:
        abort(404)

    return jsonify({"Estado de eliminación": res}), 200
