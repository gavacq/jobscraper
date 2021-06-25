from flask import Flask, request
import json
import logging
from scraper.scrape import scrape, div_by_zero
from db import models
from db.models import Post, User
from db.database import sessionLocal
from db.controller import store_posts

app = Flask(__name__)

logging.basicConfig(level=logging.DEBUG)


@app.route('/db', methods=['GET'])
def get_records():
    """Return all posts in database"""
    for post in Post.query.all():
        print(vars(post))


@app.route('/search', methods=['GET'])
def scrape_posts():
    """Search for key terms and store and display results"""

    print(request.args.get('terms'))
    posts = scrape(request.args.get('terms'))
    [item.update(id=idx) for idx, item in enumerate(posts)]
    print(posts)
    return json.dumps(posts)


@app.route('/hello')
def hello():
    """Debug route to test Flask - React connectivity"""

    return {"message": "Hello, World!"}

# Run `npm run flask shell` to import flask app into interpreter
@app.shell_context_processor
def make_shell_context():
    return {'db': sessionLocal(), 'User': User, 'Post': Post, 'scrape': scrape,
            'md': models.base.metadata, 'store_posts': store_posts, 'div': div_by_zero}
