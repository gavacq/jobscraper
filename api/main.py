from flask import Flask, request
from .scraper import scrape
import json
from . import models
from .models import Record, User
from .database import engine, sessionLocal

app = Flask(__name__)


def store_records(records):
    db = sessionLocal()

    models.base.metadata.create_all(bind=engine)

    print(type(records))
    print(records)
    for record in records:
        db_record = Record(
            name=record['name'],
            url=record['url'],
            desc=record['desc']
        )
        db.add(db_record)

    db.commit()
    db.close()


@app.route('/db', methods=['GET'])
def get_records():

    for record in Record.query.all():
        print(vars(record))


@app.route('/search', methods=['GET'])
def harvest_records():
    print(request.args.get('terms'))
    records = scrape(request.args.get('terms'))
    [item.update(id=idx) for idx, item in enumerate(records)]
    print(records)
    return json.dumps(records)


@app.route('/hello')
def hello():
    return {"message": "Hello, World!"}
