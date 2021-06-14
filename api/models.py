from pymysql import STRING
from sqlalchemy import Column, Integer, String
from sqlalchemy.types import Date
from .database import base

class JobRecord(base):
  __tablename__ = "Records"
  
  id = Column(Integer, primary_key=True, index=True)
  name = Column(String)
  url = Column(String)
  desc = Column(String)
  
class User(base):
  __tablename__ = "Users"

  id = Column(Integer, primary_key=True, index=True)
  name = Column(String, index=True, unique=True)
  email = Column(String, index=True, unique=True)
  password_hash = Column(String)