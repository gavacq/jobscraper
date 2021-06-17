from flask import Flask, request
from scraper.scrape import scrape
import json
from db import models
from db.models import Post, User
from db.database import engine, sessionLocal

app = Flask(__name__)


def store_posts(posts):
    db_session = sessionLocal()

    models.base.metadata.create_all(bind=engine)

    print(type(posts))
    print(posts)
    for post in posts:
        db_post = Post(
            name=post['name'],
            url=post['url'],
            desc=post['desc']
        )
        db_session.add(db_post)

    db_session.commit()
    db_session.close()


@app.route('/db', methods=['GET'])
def get_records():

    for post in Post.query.all():
        print(vars(post))


@app.route('/search', methods=['GET'])
def scrape_posts():
    print(request.args.get('terms'))
    posts = scrape(request.args.get('terms'))
    [item.update(id=idx) for idx, item in enumerate(posts)]
    print(posts)
    return json.dumps(posts)


@app.route('/hello')
def hello():
    return {"message": "Hello, World!"}


@app.shell_context_processor
def make_shell_context():
    return {'db': sessionLocal(), 'User': User, 'Post': Post, 'scrape': scrape,
            'md': models.base.metadata, 'store_posts': store_posts}
