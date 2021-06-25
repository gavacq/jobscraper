import logging
from db.models import Post
from db.database import engine, sessionLocal
from db import models


def store_posts(posts):
    """Store posts in database"""

    db_session = sessionLocal()

    models.base.metadata.create_all(bind=engine)

    for post in posts:
        db_post = Post(
            name=post['name'],
            url=post['url'],
            desc=post['desc']
        )
        db_session.add(db_post)
        logging.info(f'Added post: {post}')

    db_session.commit()
    db_session.close()
