from pymysql import STRING
from sqlalchemy import Column, Integer, String
from sqlalchemy.types import Date
from .database import base

class JobRecord(base):
  __tablename__ = "Records"
  
  id = Column(Integer, primary_key=True, index=True)
  name = Column(String(128))
  url = Column(String(512))
  desc = Column(String(4096))
  
class User(base):
  __tablename__ = "Users"

  id = Column(Integer, primary_key=True, index=True)
  name = Column(String(64), index=True, unique=True)
  email = Column(String(128), index=True, unique=True)
  password_hash = Column(String(128))