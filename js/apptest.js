const puppeteer = require('puppeteer');
const onet = require('./onet');
const helpers = require('./helpers');
const setup = require('./routing_setup');

let scrape = async () => {
  const browser = await puppeteer.launch({headless: true});
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
    time: new Date()
  };
  return output;
};

let routObj = setup.routingSetUp();
let port = routObj.port;
let app = routObj.app;
let getData = {
  text: '',
  time: ''
};
app.get('/', (request, response) => {
  scrape().then(function (result) {
    console.log(result);
    
    response.render('home', {
      name: 'Kutasie',
      nice: function niceOrNot () {
        let chance = Math.random();
        let string;
        chance > 0.5 ? string = 'nice' : string = 'not nice';
        return string;
      },
      displayData: result
    });
  });
});
app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
});
