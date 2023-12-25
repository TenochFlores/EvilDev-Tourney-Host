from dataclasses import dataclass
from datetime import date

from alchemyClasses import db
from sqlalchemy import Column, ForeignKey, SmallInteger, UniqueConstraint, String, LargeBinary, Date, Text
from sqlalchemy.orm import relationship
import base64


@dataclass
class Entrar(db.Model):
    __tablename__ = 'entrar'
    id_torneo = Column(SmallInteger, ForeignKey(
        'torneo.id_torneo'), primary_key=True)
    id_participante = Column(SmallInteger, ForeignKey(
        'participante.id_participante'), primary_key=True)

    torneo = relationship("Torneo", back_populates="participantes")
    participante = relationship("Participante", back_populates="torneos")

    def __init__(self, id_torneo, id_participante):
        self.id_torneo = id_torneo
        self.id_participante = id_participante


@dataclass
class Participante(db.Model):
    __tablename__ = 'participante'

    id_participante = Column(
        SmallInteger, primary_key=True, autoincrement=True)
    foto = Column(LargeBinary, nullable=False)
    nombre = Column(String(64), nullable=False)
    username = Column(String(20), nullable=False)
    correo = Column(String(200), nullable=False)
    password = Column(String(64), nullable=False)

    __table_args__ = (
        UniqueConstraint('correo', name='unique_correo'),
    )

    def __init__(self, foto, nombre, username, correo, password):
        self.foto = foto
        self.nombre = nombre
        self.username = username
        self.correo = correo
        self.password = password

    def __str__(self):
        return f'ID Participante: {self.id_participante}\nNombre: {self.nombre}\nUsername: {self.username}\nCorreo: {self.correo}'
    
    def to_dict(self):
        return {
            "id": self.id_participante,
            "foto":base64.b64encode(self.foto).decode('utf-8') if self.foto is not None else "None",
            "nombre":self.nombre,
            "username":self.username,
            "correo":self.correo,
            "password":self.password
        }

    torneos = relationship("Entrar", back_populates="participante")


@dataclass
class Torneo(db.Model):
    __tablename__ = 'torneo'

    id_torneo = Column(SmallInteger, primary_key=True, autoincrement=True)
    id_administrador = Column(SmallInteger, ForeignKey(
        'administrador.id_administrador'), nullable=False)
    foto = Column(LargeBinary, nullable=False)
    nombre_torneo = Column(String(100), nullable=False)
    reglas = Column(Text, nullable=False)
    consola = Column(String(30), nullable=False)
    nombre_videojuego = Column(String(200), nullable=False)
    numero_participantes = Column(SmallInteger, nullable=False)
    fecha_inicio = Column(Date, nullable=False)
    fecha_fin = Column(Date, nullable=False)

    def __init__(self, id_administrador, nombre_torneo, reglas,
                 consola, nombre_videojuego, numero_participantes=10,
                 fecha_inicio=date.today(), fecha_fin=date.today(), foto=None):
        self.id_administrador = id_administrador
        self.foto = foto
        self.nombre_torneo = nombre_torneo
        self.reglas = reglas
        self.consola = consola
        self.nombre_videojuego = nombre_videojuego
        self.numero_participantes = numero_participantes
        self.fecha_inicio = fecha_inicio
        self.fecha_fin = fecha_fin

    def __str__(self):
        return f'ID Torneo: {self.id_torneo}\nNombre del Torneo: {self.nombre_torneo}\nID Administrador: {self.id_administrador}'

    participantes = relationship("Entrar", back_populates="torneo")


@dataclass
class Administrador(db.Model):
    __tablename__ = 'administrador'

    id_administrador = Column(
        SmallInteger, primary_key=True, autoincrement=True)
    foto = Column(LargeBinary, nullable=False)
    nombre = Column(String(64), nullable=False)
    username = Column(String(20), nullable=False)
    correo = Column(String(200), nullable=False)
    password = Column(String(64), nullable=False)

    __table_args__ = (
        UniqueConstraint('correo', name='unique_correo'),
    )

    def __init__(self, foto, nombre, username, correo, password):
        self.foto = foto
        self.nombre = nombre
        self.username = username
        self.correo = correo
        self.password = password

    def __str__(self):
        return f'ID Administrador: {self.id_administrador}\nNombre: {self.nombre}\nUsername: {self.username}\nCorreo: {self.correo}'
    
    def to_dict(self):
        return {
            "id_administrador":self.id_administrador,
            "foto":base64.b64encode(self.foto).decode('utf-8') if self.foto is not None else "None",
            "nombre":self.nombre,
            "username":self.username,
            "correo":self.correo,
            "password":self.password
        }
