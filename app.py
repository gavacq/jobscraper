from flask import Flask, render_template
from scraper import scrape

app = Flask(__name__)


@app.route('/')
def show_records():
    records = scrape("cloud", "security", "junior")
    print(records[0][0])
    return render_template('index.html', records=records)
