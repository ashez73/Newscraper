# Newscraper by Ashez
**Serverside node.js webscraper built with Puppeteer, Express and Handlebars.**

## Disclaimer
This application is a programming excercise, it is not intended to interfere with anyone's intellectual property.

## What is does and how it works
The application scrapes the very news bar from Onet.pl -  popular Polish news portal notorious for excessive advertising and not providing any accesible user API. The application is flexible. It can easily be expanded to scrap data or operate any website with little extra effort.

The node.js application scraps data using [Google's Puppeteer](https://developers.google.com/web/tools/puppeteer/) in headless mode. News' headers are acquired and html is generated using handlebars templating system. Links to articles are stored as html data tag. When the individual article is invoked link is passed to server via fetch API. Server scrapes the article,strips it from unwanted content and responds back to client providing JSON file. 

## Cloud deployment
This application is deployed to Heroku and is available [here](https://myscrapperxxxx.herokuapp.com/).
Before deploying any application to Heroku (if it uses Puppeteer) you must install [this buildpack](https://github.com/jontewks/puppeteer-heroku-buildpack), otherwise it will not work.

[More about puppeteer deployment](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md)
