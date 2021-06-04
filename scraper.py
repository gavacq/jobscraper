import csv
import sys
from datetime import datetime
import requests
from bs4 import BeautifulSoup


def get_url(terms):
    """Generate a url from search terms"""
    url = 'https://ca.indeed.com/jobs?q=%s&sort=relevance' % '+'.join(
        [str(t) for t in terms])
    return url


def get_record(card):
    """Extract job data from a single record"""
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
        if 'certification' in line:
            record = (job_title, job_url, line)
            print(line)
            return record


def scrape(*terms):
    """Main routine"""
    print(list(terms))
    url = get_url(terms)
    print(url)
    records = []

    # Check all pages
    while len(records) < 5:
        response = requests.get(url)
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
                if len(records) == 10:
                    break

        # Get URL for next page of results
        try:
            url = 'https://ca.indeed.com' + \
                page_soup.find('a', {'aria-label': 'Next'}).get('href')
        except AttributeError:
            print("End of results")
            break

    for record in records:
        print(record)

    with open('results.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['Job Title', 'URL', 'Contents'])
        writer.writerows(records)

    return records


# def main():
#     scrape("cloud", "security", "junior")


# main()
