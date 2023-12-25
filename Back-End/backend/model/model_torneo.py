from alchemyClasses import db
from alchemyClasses.models import Torneo


# Regresa todos los torneos registrados
def get_all_torneos():
    return Torneo.query.all()


# Obtiene el torneo con id_torneo, si existe regresa el Torneo, sino regresa None.
def get_torneo_by_id(id_torneo):
    return db.session.query(Torneo).filter(Torneo.id_torneo == id_torneo).first()

# Regresa true si existe el torneo, false en caso contrario
def torneo_exists_by_id(id_torneo):
    try:
        torneo = db.session.query(Torneo).filter(Torneo.id_torneo == id_torneo).first()
        if torneo is not None:
            return True
        else:
            return False
    except Exception:
        return False

# Los torneos tienen a cargo un administrador, se obtienen todos los torneos donde el id_administrador pasado por parametro coincida con su administrador asignado en id_administrador
def get_torneos_by_administrador(id_administrador):
    torneos = db.session.query(Torneo).filter(Torneo.id_administrador == id_administrador).all()
    return torneos


# Inserta un nuevo torneo con sus datos correspondientes
def insert_torneo(id_administrador, foto, nombre_torneo, reglas, consola, nombre_videojuego, numero_participantes,
                  fecha_inicio, fecha_fin):
    try:
        nuevo_torneo = Torneo(id_administrador=id_administrador, foto=foto, nombre_torneo=nombre_torneo, reglas=reglas,
                              consola=consola, nombre_videojuego=nombre_videojuego,
                              numero_participantes=numero_participantes, fecha_inicio=fecha_inicio, fecha_fin=fecha_fin)
        db.session.add(nuevo_torneo)
        db.session.commit()
        return True
    except Exception as e:
        print("[!] Error al insertar un torneo" + e)
        return False


# Edita el torneo con id_torneo actualizando sus datos a los pasados por parámetro
def edit_torneo(id_torneo, foto, nombre_torneo, reglas, consola, nombre_videojuego, numero_participantes, fecha_inicio,
                fecha_fin):
    torneo_editar = get_torneo_by_id(id_torneo)
    if torneo_editar is not None:
        torneo_editar.foto = foto
        torneo_editar.nombre_torneo = nombre_torneo
        torneo_editar.reglas = reglas
        torneo_editar.consola = consola
        torneo_editar.nombre_videojuego = nombre_videojuego
        torneo_editar.numero_participantes = numero_participantes
        torneo_editar.fecha_inicio = fecha_inicio
        torneo_editar.fecha_fin = fecha_fin
        db.session.commit()
        return True
    else:
        print("[!] Error al editar torneo: El torneo no existe con ese identificador")
        return False


# Elimina el torneo con id_torneo
def delete_torneo(id_torneo):
    torneo_eliminar = get_torneo_by_id(id_torneo)
    if torneo_eliminar is not None:
        db.session.delete(torneo_eliminar)
        db.session.commit()
        return True
    else:
        print("[!] Error al eliminar torneo: El torneo no existe con ese identificador")
        return False
