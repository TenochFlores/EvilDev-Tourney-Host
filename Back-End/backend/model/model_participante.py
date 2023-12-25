from hashlib import sha256

from CryptoUtils.CryptoUtils import cipher
from alchemyClasses import db
from alchemyClasses.models import Participante


def get_all_participantes():
    return Participante.query.all()


def get_participante_by_id(id_participante):
    return db.session.query(Participante).filter(Participante.id_participante == id_participante).first()


def get_participante_by_correo(correo_participante):
    return db.session.query(Participante).filter(Participante.correo == correo_participante).first()


def participante_exists_by_id(id_participante):
    try:
        participante = db.session.query(Participante).filter(Participante.id_participante == id_participante).first()
        if participante is not None:
            return True
        else:
            return False
    except Exception:
        return False


def participante_exists_by_correo(correo_participante):
    # try:
    #     participante = db.session.query(Participante).filter(Participante.correo == correo_participante).first()        
    #     if participante is not None:
    #         return True
    #     else:
    #         return False
    # except Exception as e:
    #     return False
    participante = db.session.query(Participante).filter(Participante.correo == correo_participante).first()        
    if participante is not None:
        return True
    else:
        return False


def auth_participante(correo_participante, password_sin_cifrar, app_logger):
    # if(participante_exists_by_correo(correo_participante)):
    #     participante = get_participante_by_correo(correo_participante)
    #     return validate(password_sin_cifrar, participante.password)
    # else:
    #     return False
    if (participante_exists_by_correo(correo_participante)):
        participante = get_participante_by_correo(correo_participante)
        part_pass_hash = participante.password
        actual_password_hash = sha256(cipher(password_sin_cifrar)).hexdigest()
        valid_password = part_pass_hash == actual_password_hash
        if valid_password:
            return participante
        return None
    else:
        return None


def insert_participante(foto, nombre, username, correo, password_sin_cifrar):
    try:
        password = sha256(cipher(password_sin_cifrar)).hexdigest()
        nuevo_participante = Participante(foto=foto, nombre=nombre, username=username, correo=correo, password=password)
        db.session.add(nuevo_participante)
        db.session.commit()

        return True
    except Exception as e:
        return False


def delete_participante_by_id(id_participante):
    try:
        db.session.query(Participante).filter(Participante.id_participante == id_participante).delete()
        db.session.commit()
        return True
    except Exception as e:
        return False


def delete_participante_by_correo(correo_participante):
    try:
        db.session.query(Participante).filter(Participante.correo == correo_participante).delete()
        db.session.commit()
        return True
    except Exception as e:
        return False

def update_participante_by_correo(correo_actual, nombre, foto, username, password_sin_cifrar, correo_a_registrar):
    try:
        participante = get_participante_by_correo(correo_actual)
        participante.correo = correo_a_registrar
        participante.nombre = nombre
        participante.foto = foto
        participante.username = username
        password = sha256(cipher(password_sin_cifrar)).hexdigest()
        participante.password = password
        db.session.commit()
        return True
    except Exception as e:
        return False