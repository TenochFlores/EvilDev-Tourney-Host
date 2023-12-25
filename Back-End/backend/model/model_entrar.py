from alchemyClasses.models import Entrar
from alchemyClasses import db


# Regresa todas las relaciones de participaciones entre participantes y torneos
def get_all_participaciones():
    return db.session.query(Entrar).query.all()


# Regresa los identificadores de los torneos en los que el participante con id_participante ha decidido participar
def torneos_participando(id_participante):
    participaciones = db.session.query(Entrar).filter(Entrar.id_participante == id_participante).all()
    return [participacion.id_torneo for participacion in participaciones]


# Regresa los identificadores de los participantes que han decidido participar en el torneo con id_torneo
def participantes_participando(id_torneo):
    participaciones = db.session.query(Entrar).filter(Entrar.id_torneo == id_torneo).all()
    return [participacion.id_participante for participacion in participaciones]


# Regresa True si hay un campo donde exista una relación entre id_participante y id_torneo indicando que el participante participa en dicho torneo, en caso contrario regresa False
def status_participacion(id_participante, id_torneo):
    participacion = db.session.query(Entrar).filter(Entrar.id_participante == id_participante,
                                                    Entrar.id_torneo == id_torneo).first()
    return participacion is not None

# Elimina todos los registros dado un id_participante, regresa true si se eliminaron todos los registros, false en caso contrario
def eliminar_records_participante(id_participante):
    db.session.query(Entrar).filter_by(id_participante=id_participante).delete()
    db.session.commit()
    # Intentamos traer un registro con el id_participante para comprobar que se hayan eliminado
    registros_participante = get_records_participante(id_participante=id_participante)
    if not registros_participante:
        return True
    else:
        return False

def get_records_participante(id_participante):
    records = db.session.query(Entrar).filter_by(id_participante=id_participante).all()  
    return records;

# El participante con id_participante abandona el torneo con id_torneo
def salir_torneo(id_participante, id_torneo):
    try:
        db.session.query(Entrar).filter(Entrar.id_participante == id_participante,
                                        Entrar.id_torneo == id_torneo).delete()
        db.session.commit()
        return True
    except Exception as e:
        return False


# El participante con id_participante decide entrar/participar en el torneo con id_torneo
def entrar_torneo(id_participante, id_torneo):
    try:
        nuevo_registro = Entrar(id_participante=id_participante, id_torneo=id_torneo)
        db.session.add(nuevo_registro)
        db.session.commit()
        return True
    except Exception as e:
        print("[!] Error al registrar participacion en torneo" + str(e))
        return False
