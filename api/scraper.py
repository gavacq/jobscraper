import csv
import requests
from bs4 import BeautifulSoup


def create_url(terms):
    """Generate a url from search terms"""
    url = 'https://ca.indeed.com/jobs?q=%s&sort=relevance' % '+'.join(
        [str(t) for t in terms])
    return url


def get_record(card):
    """Extract a job data record from a single card"""
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

    # Only return a record if it contains the word "certification"
    text_lines = text.split('\n')

    for line in text_lines:
        if 'the' in line:
            record = {'job': job_title, 'url': job_url, 'desc': line}
            print(line)
            return record


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
    records = []

    # # debugging
    # records.append({'job': "Junior dev", 'url': "foo.com", 'desc': "do foo things"})
    # records.append({'job': "Senior dev", 'url': "bar.com", 'desc': "do bar things"})
    # # print(records)
    # return records

    # Check all pages
    while True:
        response = requests.get(url)
        print(response.status_code)
        page_soup = BeautifulSoup(response.text, 'html.parser')

        # Check all job cards on page
        cards = page_soup.find_all('div', 'jobsearch-SerpJobCard')
        for card in cards:
            try:
                record = get_record(card)
            except AttributeError:
                continue
            if record is not None:
                records.append(record)
                if len(records) > 3:
                    return records

        # Get URL for next page of results
        try:
            url = 'https://ca.indeed.com' + \
                page_soup.find('a', {'aria-label': 'Next'}).get('href')
        except AttributeError:
            print("End of results")
            break

    # write_to_csv(records)

    print(records)

    return records
