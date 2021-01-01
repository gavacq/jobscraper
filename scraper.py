#pylint: disable-all
#Indeed job scraper

import csv
import sys
from datetime import datetime
import requests
from bs4 import BeautifulSoup



def get_url(term1, term2):
    """Generate a url from 2 search terms"""
    template = 'https://ca.indeed.com/jobs?q={}+{}&sort=relevance'    
    url = template.format(term1, term2)
    return url

def get_record(card):
    """Extract job data from a single record"""
    atag = card.h2.a
    job_title = atag.get('title')
    print('JOB TITLE:' + job_title)
    atag = card.h2.a
    job_url = 'https://ca.indeed.com' + atag.get('href')
    response = requests.get(job_url)
    card_soup = BeautifulSoup(response.text, 'html.parser')
    try:
        text = card_soup.find('div', 'jobsearch-jobDescriptionText').text
    except AttributeError:
        print('No job description')
        raise AttributeError

    text_lines = text.split('\n')
    for line in text_lines:
        if 'certification' in line:
            record = (job_title, job_url, line)
            print(line)
            return record

def main(term1, term2):
    """Main routine"""
    url = get_url(term1, term2)
    records = []

    # Check all pages
    while True:
        response = requests.get(url)
        page_soup = BeautifulSoup(response.text, 'html.parser')

        # Check all cards on page
        cards = page_soup.find_all('div', 'jobsearch-SerpJobCard')
        for card in cards:
            try:
                record = get_record(card)
            except AttributeError:
                continue
            if record is not None:
                records.append(record)            

        try:
            url = 'https://ca.indeed.com' + page_soup.find('a', {'aria-label': 'Next'}).get('href')
        except AttributeError:
            print("End of results")
            break
    
    for record in records:
        print(record)

    with open('results.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['Job Title', 'URL', 'Contents'])
        writer.writerows(records)

#Run main routine
main('junior', 'devops')