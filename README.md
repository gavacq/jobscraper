# Jobscraper

Scrape job sites for keywords

- only supports Indeed.com
- Stores results in csv file
- Fully traverses set of results pages

***

## Setup

Activate venv (`python3`) and install modules

```shell
$ python3 -m venv env 
$ source env/bin/activate
$ pip install -r requirements.txt
```

Check that flask is set up

```shell
$ python3 -c "import flask; print(flask.__version__)"
```

## Run

