---
templateKey: article-page
title: 'Scraping Dynamic Websites (Angular, React etc) with Scrapy and Selenium'
date: '2018-05-04T18:51:35+05:30'
cover: /img/scrapy.png
tags:
  - Scrapy
  - Selenium
  - Python
  - Scraping
meta_title: 'Scraping Dynamic Websites (Angular, React etc) with Scrapy and Selenium'
meta_description: >-
  Scraping websites made with Javascript frameworks like Angular and React is
  not possible with Scrapy or Beautiful Soup, learn to do so with the added help
  of Selenium.
---
Last week i was assigned a task of scraping some data from a website, regular stuff no big deal. So, I set up a Scrapy Project, write the spider, and run the project sipping tea. What do I get?! A blank CSV file with no data! I try some more, make changes to the selector, and run it again to no avail. Then I notice that the website is made on Angular JS. Neither `beautiful_soup` nor `Scrapy` can scrape dynamic websites. I look up online and find out that only two framework that can do so are: `Splash` and `Selenium`. I chose `Selenium`, mainly for two reasons:

* More Python friendly
* More likely to be useful in future projects.

In brief what we're about to do is, use the webdriver of a browser with the help of Selenium to render the entire page along with the dynamic parts, then scrape it. But before we begin, I'm gonna assume the following:

* This is not a scrapy tutorial for beginners, i'll assume some familiarity
* A dummy page to be scraped, the links that have to be scraped has the class "ng-binding"
* A scrapy project has been set up and blank spider script is ready, where in our code goes.

## Setting up Geckodriver

To begin we need to install, `geckodriver`, which is webdriver for Firefox web browser. I'm gonna write the instructions for Linux, you can look up the installation for your specific OS.
First download the latest edition of geckodriver:

```
wget https://github.com/mozilla/geckodriver/releases/download/v0.20.1/geckodriver-v0.20.1-linux64.tar.gz
```
Extract the file with:
```
tar -xvzf geckodriver*
```
Make it executable:
```
chmod +x geckodriver
```
Make it accessible by command line:
```
sudo mv geckodriver /usr/local/bin/
```
