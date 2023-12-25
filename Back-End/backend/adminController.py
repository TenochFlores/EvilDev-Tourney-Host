from flask import Blueprint, request, abort, jsonify, Response, current_app

from model.model_administrador import administrador_exists_by_correo, auth_administrador, \
    get_all_administradores, insert_administrador, update_administrador, get_administrador_by_id, delete_administrador_by_id


admin = Blueprint('admin', __name__)

@admin.route('/get-administradores',methods=['GET'])
def get_administradores():

    admins = get_all_administradores()
    admins_as_dict = list(map(lambda x: x.to_dict(),admins))

    people = {
        "data": admins_as_dict
    }

    return jsonify(people)

@admin.route('/get-administrador-by-id',methods=['GET'])
def get_administrador_id():
        admin_id = request.args.get('id')
        administrador = get_administrador_by_id(admin_id)
        admin = {
             "admin": administrador.to_dict()
        }
        return jsonify(admin)

@admin.route('/update-administrador',methods=['POST'])
def update_administrador_post():
    if request.method == 'POST':
        idadmin = request.form['id']
        nombre = request.form['nombre']
        correo = request.form['correo']
        username = request.form['username']
        status = update_administrador(id_administrador=idadmin, nombre=nombre, username=username, correo=correo)
        if(status):
            return jsonify({'message': 'Edición exitosa'}), 200
        else:
            return jsonify({'message': 'Error al editar, intente ingresando otro correo.'}), 409
        
@admin.route('/eliminar_administrador', methods=['POST'])
def eliminar_administrador():
    if request.method == 'POST':
        idAEliminar = request.form['id']
        idAEliminar = int(idAEliminar)

        if( idAEliminar <= 1 ):
            message = "[!] Error al eliminar: El id no es valido para eliminacion"
            print(message)
            return jsonify({'message' : message}), 401
        else:
            delete_administrador_by_id(idAEliminar)
            return jsonify({'message': "Eliminación Exitosa"}), 200