---
templateKey: article-page
title: Scraping Dynamic Websites (Angular, React etc) with Scrapy and Selenium
slug: scraping-dynamic-single-page-websites-with-scrapy-and-selenium
author: Vaibhav Sharma
authorLink: https://twitter.com/vaibhaved
date: 2018-05-04T18:51:35+05:30
cover: /img/scraping_dynamic_webapps.jpg
metaTitle: Scraping Dynamic Websites (Angular, React etc) with Scrapy and Selenium
metaDescription: Scraping websites made with Javascript frameworks like Angular
  and React is not possible with Scrapy or Beautiful Soup, learn to do so with
  the added help of Selenium.
tags:
  - scrapy
  - selenium
  - python
  - scraping
---
Last week I was assigned a task of scraping some data from a website, regular stuff no big deal. So, I set up a Scrapy Project, write the spider, and run the project sipping tea. What do I get?! A blank CSV file with no data! I try some more, make changes to the selector, and run it again to no avail. Then I notice that the website is made on Angular JS. Neither `beautiful_soup` nor `Scrapy` can scrape dynamic websites. I look up online and find out that only two frameworks that can do so are: `Splash` and `Selenium`. I chose `Selenium`, mainly for two reasons:

* More Python friendly
* More likely to be useful in future projects.

In brief what we're about to do is, use the webdriver of a browser with the help of Selenium to render the entire page along with the dynamic parts, then scrape it. But before we begin, I'm gonna assume the following:

* This is not a scrapy tutorial for beginners, I'll assume some familiarity
* A dummy page to be scraped, the links that have to be scraped has the class "ng-binding"
* A scrapy project has been set up and a blank spider script is ready, wherein our code goes.

## Setting up Geckodriver

To begin we need to install, `geckodriver`, which is webdriver for Firefox web browser. I'm gonna write the instructions for Linux, you can look up the installation for your specific OS.
First, download the latest edition of geckodriver:

```bash
wget https://github.com/mozilla/geckodriver/releases/download/v0.20.1/geckodriver-v0.20.1-linux64.tar.gz
```

Extract the file with:

```bash
tar -xvzf geckodriver*
```

Make it executable:

```bash
chmod +x geckodriver
```

Make it accessible by command line:

```bash
sudo mv geckodriver /usr/local/bin/
```

## Writing the Spider

In the spider file, let's assume its name is `angular.py` first we need to import the following:

```python
import scrapy
import csv
from selenium import webdriver
```

Then we need to set up the spider class:

```python
...

class AngularSpider(scrapy.Spider):
    name = 'angular_spider'
    start_urls = [
        'https://www.example.com/?page=1',
        'https://www.example.com/?page=2',
    ]    
    # Initalize the webdriver    
    def __init__(self):
        self.driver = webdriver.Firefox()

    
    # Parse through each Start URLs
    def start_requests(self):
        for url in self.start_urls:
            yield scrapy.Request(url=url, callback=self.parse)    
    

   # Parse function: Scrape the webpage and store it
   def parse(self, response):
       pass   
```

The real magic happens in the parse function, here we'll write the selector for the data, and the output in a CSV file:

```python
    ...
    
    # Parse function: Scrape the webpage and store it
    def parse(self, response):
        self.driver.get(response.url)
        # Output filename
        filename = "angular_data.csv"
        with open(filename, 'a+') as f:
            writer = csv.writer(f)
            # Selector for all the names from the link with class 'ng-binding'
            names = self.driver.find_elements_by_css_selector("a.ng-binding")
            for name in names:
                title = name.text
                writer.writerow([title])
        self.log('Saved file %s' % filename)
```

Now when you run this using:

```bash
scrapy crawl angular_spider
```

You'll notice a browser opens up and the page is loaded, and when the scraping is complete you can open the CSV file and see the data.

But one of the most frustrating parts of automated web scraping is constantly dealing with IP blocks and CAPTCHAs. To deal with those it's best to use a professional scraping service like [Scraper API](https://www.scraperapi.com/?fpr=theleakycauldronblog). [Scraper API](https://www.scraperapi.com/?fpr=theleakycauldronblog) rotates IP addresses with each request, from a pool of millions of proxies across over a dozen ISPs, and automatically retries failed requests, so you will never be blocked. [Scraper API](https://www.scraperapi.com/?fpr=theleakycauldronblog) also handles CAPTCHAs for you, so you can concentrate on turning websites into actionable data.
*(affiliate)*
