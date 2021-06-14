import pymysql
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DB_URL = "mysql://gaa:123@localhost/jobscraper"

pymysql.install_as_MySQLdb()

engine = create_engine(
    DB_URL, echo=True, future=True)

sessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

base = declarative_base()
