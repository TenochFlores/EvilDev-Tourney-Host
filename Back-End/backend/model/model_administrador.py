from hashlib import sha256

from CryptoUtils.CryptoUtils import cipher
from alchemyClasses import db
from alchemyClasses.models import Administrador


def get_all_administradores():
    return Administrador.query.all()


def get_administrador_by_id(id_administrador):
    return db.session.query(Administrador).filter(Administrador.id_administrador == id_administrador).first()


def get_administrador_by_correo(correo_administrador):
    return db.session.query(Administrador).filter(Administrador.correo == correo_administrador).first()


def administrador_exists_by_id(id_administrador):
    try:
        administrador = db.session.query(Administrador).filter(
            Administrador.id_administrador == id_administrador).first()
        if administrador is not None:
            return True
        else:
            return False
    except Exception:        
        return False


def administrador_exists_by_correo(correo_administrador):
    try:
        administrador = db.session.query(Administrador).filter(Administrador.correo == correo_administrador).first()
        if administrador is not None:
            return True
        else:
            return False
    except Exception:
        return False


def auth_administrador(correo_administrador, password_sin_cifrar):
    if administrador_exists_by_correo(correo_administrador):
        administrador = get_administrador_by_correo(correo_administrador)
        admin_pass_hash = administrador.password
        actual_password_hash = sha256(cipher(password_sin_cifrar)).hexdigest()
        valid_password = admin_pass_hash == actual_password_hash
        if valid_password:
            return administrador

        return None
    else:
        return None


def insert_administrador(foto, nombre, username, correo, password_sin_cifrar):
    try:
        password_hash = sha256(cipher(password_sin_cifrar)).hexdigest()
        nuevo_administrador = Administrador(foto=foto, nombre=nombre, username=username, correo=correo,
                                            password=password_hash)
        db.session.add(nuevo_administrador)
        db.session.commit()
        print("Administrador insertado")
        return True
    except Exception as e:
        print("[!] Error al insertar el administrador en la base " + str(e))
        return False


def update_administrador(id_administrador, nombre, username, correo):
    try:
        admin = get_administrador_by_id(id_administrador=id_administrador)

        # Verificar si el nuevo correo electrónico ya existe en otro registro
        existing_admin = Administrador.query.filter(Administrador.correo == correo).first()
        
        if(existing_admin is not None):
            if existing_admin.id_administrador == id_administrador:
                # Si encontramos un registro con el mismo correo pero diferente ID,
                # indicamos que hay un correo duplicado y no actualizamos
                print("[!] Error: El correo electrónico ya está en uso por otro administrador.")
                return False
        else:
            # Actualizar el correo solo si no hay duplicados
            admin.correo = correo
            admin.nombre = nombre
            admin.username = username
            db.session.commit()
        return True
    except Exception as e:
        print("[!] Error al editar el administrador en la base " + str(e))
        return False



def delete_administrador_by_id(id_administrador):
    try:
        db.session.query(Administrador).filter(Administrador.id_administrador == id_administrador).delete()
        db.session.commit()
        return True
    except Exception as e:
        return False


def delete_administrador_by_correo(correo_administrador):
    try:
        db.session.query(Administrador).filter(Administrador.correo == correo_administrador).delete()
        db.session.commit()
        return True
    except Exception as e:
        return False


def change_password(correo_administrador, new_password):
    try:
        administrador = db.session.query(Administrador).filter(Administrador.correo == correo_administrador).first()
        if administrador is None:
            return False

        new_password_encrypted_bytes = cipher(new_password)
        new_password_encrypted = sha256(new_password_encrypted_bytes).hexdigest()

        administrador.password = new_password_encrypted
        db.session.commit()
        return True

    except Exception:
        return False
