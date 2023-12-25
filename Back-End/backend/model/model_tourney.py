from alchemyClasses import db

from alchemyClasses.models import Torneo
from sqlalchemy import select

from datetime import datetime

def get_all():
    entities = db.session.scalars(select(Torneo)).all()
    return [{
        'torneo_id': t.id_torneo,
        'foto': t.foto,
        'nombre_torneo': t.nombre_torneo,
        'reglas': t.reglas,
        'console': t.consola,
        'nombre_videojuego': t.nombre_videojuego,
        'numero_participantes': t.numero_participantes,
        'fecha_inicio': t.fecha_inicio.strftime('%Y-%m-%d'),  # Formatear fecha a AAAA-MM-DD
        'fecha_fin': t.fecha_fin.strftime('%Y-%m-%d') if t.fecha_fin else None  # Igualmente formatear la fecha fin si está presente
    } for t in entities]

def get_by_id(tourney_id, logger):
    logger.info(f"(get_by_id) Searching by id: {tourney_id}")
    t = db.session.query(Torneo).filter(Torneo.id_torneo == tourney_id).first()

    logger.info("Found in database: ")
    logger.info(t)
    if t is not None:
        tourney = {
            'tourneyId': t.id_torneo,
            'tourneyName': t.nombre_torneo,
            'tourneyRules': t.reglas,
            'tourneyConsole': t.consola,
            'tourneyGameName': t.nombre_videojuego,
            'tourneyStartDate': t.fecha_inicio,
            'tourneyEndDate': t.fecha_fin,
        }
        return tourney
    return None


def __get_by_id(tourney_id, logger):
    return db.session.query(Torneo).filter(Torneo.id_torneo == tourney_id).first()


def create_or_update_tourney(torneo, logger):
    logger.info("Request from client: ")
    logger.info(torneo)
    try:
        t = __get_by_id(torneo['tourneyId'], logger)
        logger.info(f"Found tourney in database: {t}")
        if t is None:
            t_new = Torneo(id_administrador=torneo['tourneyAdminId'],
                           nombre_torneo=torneo['tourneyName'],
                           reglas=torneo['tourneyRules'],
                           consola=torneo['tourneyConsole'],
                           nombre_videojuego=torneo['tourneyGameName'],
                           fecha_inicio=datetime
                           .fromisoformat(torneo['tourneyStartDate'].replace('Z','')),
                           fecha_fin=datetime
                           .fromisoformat(torneo['tourneyEndDate'].replace('Z','')))
            logger.info(t_new)
            db.session.add(t_new)
            db.session.commit()
            return True

        t.id_administrador = torneo['tourneyAdminId']
        # t.foto = torneo['photo']
        t.nombre_torneo = torneo['tourneyName']
        t.reglas = torneo['tourneyRules']
        t.consola = torneo['tourneyConsole']
        t.nombre_videojuego = torneo['tourneyGameName']
        t.numero_participantes = torneo['tourneyParticipantsNumber']
        t.fecha_inicio = datetime.fromisoformat(torneo['tourneyStartDate'].replace('Z',''))
        t.fecha_fin = datetime.fromisoformat(torneo['tourneyEndDate'].replace('Z',''))

        db.session.commit()
        return True
    except Exception as ex:
        logger.error(ex)
        return False


def delete_tourney_by_id(id):
    try:
        Torneo.query.filter(Torneo.id_torneo == id).delete()
        db.session.commit()
        return True
    except Exception:
        return False
