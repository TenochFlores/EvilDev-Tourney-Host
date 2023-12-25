from flask import Blueprint, request, abort, jsonify, Response, current_app

from model.model_administrador import administrador_exists_by_correo, auth_administrador, \
    change_password, delete_administrador_by_id, insert_administrador
from model.model_participante import participante_exists_by_correo, auth_participante, insert_participante, get_participante_by_correo, update_participante_by_correo
auth = Blueprint('auth', __name__)
correo_super_administrador = 'c.cabrera@ciencias.unam.mx'


@auth.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    user_email = data.get('email')
    user_password = data.get('password')
    tipo_cuenta = data.get('tipo_cuenta')

    if tipo_cuenta == "super-administrador":
        sup_admin_exists = administrador_exists_by_correo(user_email)

        if sup_admin_exists and user_email == correo_super_administrador:
            sup_admin_auth = auth_administrador(user_email, user_password)

            if sup_admin_auth is None:
                error_message = "[!] Error en Login: La autenticación del super administrador indica error"
                print(error_message)
                abort(401)

            user_response = {
                'userID': sup_admin_auth.id_administrador,
                'userLogin': sup_admin_auth.correo,
                'userStatus': 1
            }

            return jsonify(user_response)
        else:
            print(
                "[!] Error en Login: El super-administrador con el correo ingresado no existe")
            abort(401)

    if tipo_cuenta == "administrador":
        admin_exists = administrador_exists_by_correo(user_email)

        if admin_exists and user_email != correo_super_administrador:
            admin_auth = auth_administrador(user_email, user_password)

            if admin_auth is None:
                error_message = "[!] Error en Login: La autenticación del administrador indica error"
                print(error_message)
                abort(401)

            user_response = {
                'userID': admin_auth.id_administrador,
                'userLogin': admin_auth.correo,
                'userStatus': 2
            }
            return jsonify(user_response)
        else:
            print(
                "[!] Error en Login: El administrador con el correo ingresado no existe")
            abort(401)

    if tipo_cuenta == "participante":
        part_exists = participante_exists_by_correo(user_email)
        if part_exists:
            part_auth = auth_participante(
                user_email, user_password, current_app.logger)
            if part_auth is None:
                error_message = "[!] Error en Login: La autenticación del participante indica error"
                print(error_message)
                abort(401)
            user_response = {
                'userID': part_auth.id_participante,
                'userLogin': part_auth.correo,
                'userStatus': 3
            }
            return jsonify(user_response)
        else:
            print(
                "[!] Error en Login: El participante con el correo ingresado no existe")
            abort(401)


@auth.route('/api/auth/forgot-password', methods=['POST'])
def recover_password():
    data = request.get_json()
    user_email = data.get('email')
    user_password = data.get('password')

    admin_exists = administrador_exists_by_correo(user_email)
    if not admin_exists:
        abort(400)

    password_changed = change_password(user_email, user_password)
    if not password_changed:
        abort(500)

    return Response(status=200)


@auth.route('/registro_administrador', methods=['POST'])
def registro_administrador():
    if request.method == 'POST':

        # Obtener la imagen y convertirla a datos binarios
        perfil = request.files['perfil']
        foto = perfil.read()  # Esto obtiene los datos binarios de la imagen

        # Obtenemos los datos restantes
        nombre = request.form['nombre']
        correo = request.form['correo']
        username = request.form['username']
        password = request.form['password']

        if administrador_exists_by_correo(correo):
            message = "[!] Error al registrar: El correo del administrador ingresado ya existe"
            print(message)
            return jsonify({'message': message}), 401
        else:
            insert_administrador(foto, nombre, username, correo, password)
            return jsonify({'message': 'Registro exitoso'}), 200

@auth.route('/registro_participante', methods=['POST'])
def registro_participante():
    if request.method == 'POST':
        
        # Obtener la imagen y convertirla a datos binarios
        perfil = request.files['perfil']
        foto = perfil.read()  # Esto obtiene los datos binarios de la imagen
        # Obtenemos los datos restantes
        nombre = request.form['nombre']
        correo = request.form['correo']
        username = request.form['username']
        password = request.form['password']

        if(participante_exists_by_correo(correo)):
            print("[!] Error al registrar: El correo del participante ingresado ya existe")
            abort(401)
            return jsonify({'message': 'Error al registrar: El correo del participante ingresado ya existe'})
        else:
            insert_participante(foto, nombre,username,correo,password)
            
            return jsonify({'message': 'Registro exitoso'})
        
@auth.route('/editar_participante', methods=['POST'])
def editar_participante():
    if request.method == 'POST':

        # Obtenemos los datos restantes
        nombre = request.form['nombre']
        correo_actual = request.form['correo_actual']
        correo_nuevo = request.form['correo_nuevo']
        username = request.form['username']
        password = request.form['password']

        if not participante_exists_by_correo(correo_actual):
            print("[!] Error al editar: El correo del participante ingresado no existe")
            return jsonify({'message': 'Error al editar: Correo inexistente'})
        else:
            participante = get_participante_by_correo(correo_actual)

            # Obtener la imagen y convertirla a datos binarios
            if 'perfil' in request.files:
                perfil = request.files['perfil']
                photo = perfil.read()  # Esto obtiene los datos binarios de la imagen
            else:
                photo = participante.foto

            nombre = nombre if len(nombre) != 0 else participante.nombre
            foto = photo 
            username = username if len(username) != 0 else participante.username
            password = password if len(password) != 0 else participante.password
            correo_a_registrar = correo_actual if len(correo_nuevo) == 0 else correo_nuevo

            status = update_participante_by_correo(correo_actual, nombre, foto, username, password, correo_a_registrar)
            
            if(status):
                return jsonify({'message': 'Edición del participante exitosa'})
            else:
                return jsonify({'message': 'Edición del participante fallida'})
            
            
        
        
@auth.route('/get-participante-con-correo/',methods=['POST'])
def get_participante_con_correo():

    # Obtener datos del cuerpo de la solicitud
    data = request.json
    correo = data.get('terminoBusqueda')

    #correo = 'hisaishi@gmail.com'

    # Realizar la lógica para obtener el participante por correo
    participante = get_participante_by_correo(correo)

    people = [participante.to_dict()] if participante is not None else []

    people = {
        "data": people
    }

    return jsonify(people)