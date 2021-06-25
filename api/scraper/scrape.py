from bs4 import BeautifulSoup
import csv
import requests
import logging

# Retrieve posts from Faker instead of live sites
LIVE_SEARCH = True


def create_url(terms):
    """Generate a url from search terms"""
    url = 'https://ca.indeed.com/jobs?q=%s&sort=relevance' % '+'.join(
        [str(t) for t in terms])
    return url


def div_by_zero():
    a = 5
    b = 0
    try:
        c = a/b
    except Exception as e:
        logging.error("Exception occurred", exc_info=True)


def get_post(card):
    """Extract a job data post from a single card"""
    atag = card.h2.a
    job_title = atag.get('title')
    print('JOB TITLE:' + job_title)
    job_url = 'https://ca.indeed.com' + atag.get('href')
    response = requests.get(job_url)
    card_soup = BeautifulSoup(response.text, 'html.parser')
    try:
        text = card_soup.find('div', 'jobsearch-jobDescriptionText').text
    except AttributeError:
        print('No job description')
        raise AttributeError

    # Only return a post if it contains the word "certification"
    text_lines = text.split('\n')

    for line in text_lines:
        if 'the' in line:
            post = {'name': job_title, 'url': job_url, 'desc': line}
            print(line)
            return post


def write_to_csv(data):

    with open('results.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['Job Title', 'URL', 'Contents'])
        writer.writerows(data)


def scrape(*terms):
    """Main routine"""
    print(terms)
    print(list(terms))
    url = create_url(terms)
    print(url)
    posts = []

    if (LIVE_SEARCH == False):
        posts.append(
            {'job': "Junior dev", 'url': "foo.com", 'desc': "do foo things"})
        posts.append(
            {'job': "Senior dev", 'url': "bar.com", 'desc': "do bar things"})
        print(posts)
        return posts

    # Check all pages
    while True:
        response = requests.get(url)
        print(response.status_code)
        page_soup = BeautifulSoup(response.text, 'html.parser')

        # Check all job cards on page
        cards = page_soup.find_all('div', 'jobsearch-SerpJobCard')
        for card in cards:
            try:
                post = get_post(card)
            except AttributeError:
                continue
            if post is not None:
                posts.append(post)
                if len(posts) > 3:
                    return posts

        # Get URL for next page of results
        try:
            url = 'https://ca.indeed.com' + \
                page_soup.find('a', {'aria-label': 'Next'}).get('href')
        except AttributeError:
            print("End of results")
            break

    # write_to_csv(posts)

    print(posts)

    return posts
