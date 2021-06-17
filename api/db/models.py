from sqlalchemy import Column, Integer, String, Table, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.sql import func
from db.database import base

UserPost = Table('UserPost', base.metadata,
  Column('id', Integer, primary_key=True),
  Column('userId', Integer, ForeignKey('User.id')),
  Column('postId', Integer, ForeignKey('Post.id')))

class Post(base):
  __tablename__ = "Post"
  id = Column(Integer, primary_key=True, index=True)
  name = Column(String(128))
  url = Column(String(512))
  desc = Column(String(4096))
  timestamp = Column(DateTime(timezone=True), server_default=func.now())
  
  def __repr__(self):
    return '<Post {}>'.format(self.name)

class User(base):
  __tablename__ = "User"
  id = Column(Integer, primary_key=True, index=True)
  name = Column(String(64), index=True, unique=True)
  email = Column(String(128), index=True, unique=True)
  password_hash = Column(String(128))
  posts = relationship('Post', secondary=UserPost, backref='users')

  def __repr__(self):
    return '<User {}>'.format(self.name)