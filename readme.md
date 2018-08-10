# Newscraper by Ashez
###### Serverside node.js webscraper build with puppeteer, express and handlebars.

## Disclaimer
This application is a programming excercise.

## What is does and how it works
The application scrapes the very news bar from Onet.pl -  popular Polish news portal notorious for excessive advertising and not providing any external user API. The application is flexible. It can easily be expanded to scrap data or operate any website with little extra effort.

The node.js application scarps data using Google's Puppeteer in headless mode. News' headers are acquired and html is generated using handlebars templating system. Links to articles are stored as html data tag. When the individual article is invoked link is passed to server via fetch API. Server scrapes the article,strips it from unwanted content and responds back to client providing JSON file. 
