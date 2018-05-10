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
