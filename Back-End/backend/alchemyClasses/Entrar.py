# from alchemyClasses import db
# from sqlalchemy import Column, ForeignKey, SmallInteger
# from sqlalchemy.orm import relationship
#
# class Entrar(db.model):
#     __tablename__ = 'entrar'
#     id_torneo = Column(SmallInteger, ForeignKey('torneo.id_torneo'), primary_key=True)
#     id_participante = Column(SmallInteger, ForeignKey('participante.id_participante'), primary_key=True)
#
#     torneo = relationship("Torneo", back_populates="participantes")
#     participante = relationship("Participante", back_populates="torneos")
#
#     def __init__(self, id_torneo, id_participante):
#         self.id_torneo = id_torneo
#         self.id_participante = id_participante