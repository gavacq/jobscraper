from flask import Flask, request
from scraper import scrape
import json

app = Flask(__name__)


@app.route('/search', methods=['GET'])
def show_records():
    print(request.args.get('terms'))
    records = scrape(request.args.get('terms'))
    [item.update(id=idx) for idx, item in enumerate(records)]
    print(records)
    return json.dumps(records)


@app.route('/hello')
def hello():
    return {"message": "Hello, World!"}
