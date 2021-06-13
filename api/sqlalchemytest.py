import pymysql
from sqlalchemy import create_engine
from sqlalchemy import text

pymysql.install_as_MySQLdb()

engine = create_engine("mysql://gaa:123@localhost/jobscraper", echo=True, future=True)

with engine.connect() as conn:
  result = conn.execute(text("select 'hello world'"))
  print(result.all())