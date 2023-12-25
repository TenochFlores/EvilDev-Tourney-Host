# from alchemyClasses import db
# from sqlalchemy import Column, String, Integer, SmallInteger, Blob, UniqueConstraint
# from sqlalchemy.orm import relationship
#
# class Participante(db.model):
#     __tablename__ = 'participante'
#
#     id_participante = Column(SmallInteger, primary_key=True, autoincrement=True)
#     foto = Column(Blob, nullable=False)
#     nombre = Column(String(64), nullable=False)
#     username = Column(String(20), nullable=False)
#     correo = Column(String(200), nullable=False)
#     password = Column(String(64), nullable=False)
#
#     __table_args__ = (
#         UniqueConstraint('correo', name='unique_correo'),
#     )
#
#     def __init__(self, foto, nombre, username, correo, password):
#         self.foto = foto
#         self.nombre = nombre
#         self.username = username
#         self.correo = correo
#         self.password = password
#
#     def __str__(self):
#         return f'ID Participante: {self.id_participante}\nNombre: {self.nombre}\nUsername: {self.username}\nCorreo: {self.correo}'
#
#     torneos = relationship("Entrar", back_populates="participante")
