from flask import Blueprint, request, abort, jsonify, Response, current_app
from model.model_entrar import eliminar_records_participante
import model.model_participante as m_part

part = Blueprint('participante', __name__)

@part.route('/eliminar-perfil',methods=['POST','GET'])
def eliminar_perfil():
    data = request.get_json()
    idParticipante = data.get('idParticipante')
    participante_a_eliminar  = m_part.get_participante_by_id(idParticipante)
    if participante_a_eliminar:
        status1 = m_part.delete_participante_by_id(idParticipante)
        status2 = eliminar_records_participante(id_participante=idParticipante)
        return jsonify({'message': status1 and status2}), 200
    else:
        return jsonify({'message': False}), 500

@part.route('/get-perfil',methods=['GET'])
def get_perfil():
    idParticipante = request.args.get('id')
    print("ID recibido: " + str(idParticipante))
    datos_participante  = m_part.get_participante_by_id(idParticipante)
    if datos_participante:
        return jsonify({'message': 'Datos del participante obtenidos', 'part': datos_participante.to_dict()}), 200
    else:
        return jsonify({'message': 'Error al obtener los datos del participante'}), 404