const puppeteer = require('puppeteer');
const onet = require('./js/onet');
const helpers = require('./js/helpers');
const setup = require('./js/routing_setup');
let routObj = setup.routingSetUp();
let port = routObj.port;
let app = routObj.app;
let scrape = async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.goto(onet.url);
  let textsArrayRaw = await page.evaluate(onet.text);
  let linksArrayRaw = await page.evaluate(onet.link);
  onet.shortenMe(textsArrayRaw);
  linksArrayRaw = onet.trimMe(linksArrayRaw);
  onet.shortenMe(linksArrayRaw);
  let myJson = helpers.combineObj(textsArrayRaw, linksArrayRaw);
  browser.close();
  let output = {
    json: myJson,
    title: textsArrayRaw,
    links: linksArrayRaw,
    time: new Date()
  };
  return output;
};
let scrapeLink = async (req) => {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.goto(req);
  let pagelink = [];
  pagelink = await browser.newPage();
  await pagelink.goto(req);
  let leadText = await pagelink.evaluate(() => {
    let text = document
      .querySelector('#lead')
      .innerText;
    return text;
  });
  let paragraphArrayRaw = await pagelink.evaluate(onet.article);
  paragraphArrayRaw.pop();
  paragraphArrayRaw.unshift(leadText);
  let myJson = helpers.objectifyArticle(paragraphArrayRaw);
  browser.close();
  return myJson;
};
app.get('/', (request, response) => {
  scrape().then(function (result) {
    response.render('home', {
      name: '',
      displayData: result.json,
      acquired: helpers.formatDate(result)
    });
  });
});
app.get('/link', (request, response) => {
  let req = request.query.link;
  scrapeLink(req).then(function (result) {
    response.send(result);
  });
});
app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${port}`);
});
