# from alchemyClasses import db
# from sqlalchemy import Column, String, Integer, SmallInteger,Blob, Date, Text, ForeignKey
# from sqlalchemy.orm import relationship
#
# class Torneo(db.model):
#     __tablename__ = 'torneo'
#
#     id_torneo = Column(SmallInteger, primary_key=True, autoincrement=True)
#     id_administrador = Column(SmallInteger, ForeignKey('administrador.id_administrador'), nullable=False)
#     foto = Column(Blob, nullable=False)
#     nombre_torneo = Column(String(100), nullable=False)
#     reglas = Column(Text, nullable=False)
#     consola = Column(String(30), nullable=False)
#     nombre_videojuego = Column(String(200), nullable=False)
#     numero_participantes = Column(SmallInteger, nullable=False)
#     fecha_inicio = Column(Date, nullable=False)
#     fecha_fin = Column(Date, nullable=False)
#
#
#     def __init__(self, id_administrador, foto, nombre_torneo, reglas, consola, nombre_videojuego, numero_participantes, fecha_inicio, fecha_fin):
#         self.id_administrador = id_administrador
#         self.foto = foto
#         self.nombre_torneo = nombre_torneo
#         self.reglas = reglas
#         self.consola = consola
#         self.nombre_videojuego = nombre_videojuego
#         self.numero_participantes = numero_participantes
#         self.fecha_inicio = fecha_inicio
#         self.fecha_fin = fecha_fin
#
#     def __str__(self):
#         return f'ID Torneo: {self.id_torneo}\nNombre del Torneo: {self.nombre_torneo}\nID Administrador: {self.id_administrador}'
#
#     participantes = relationship("Entrar", back_populates="torneo")