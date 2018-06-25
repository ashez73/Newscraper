const puppeteer = require('puppeteer');
const onet = require('./onet');

(async () => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.goto(onet.url);

  let textsArrayRaw = await page.evaluate(onet.text);
  let linksArrayRaw = await page.evaluate(onet.link);

  let trimMe = array => {
    let newArray = [];
    for (let entry of array) {
      let start = entry.indexOf('http');
      let end = entry.indexOf('data', -1);
      newArray.push(entry.slice(start, end).trim());
    }
    return newArray;
  };

  let shortenMe = array => {
    
    let index = array.indexOf("''");
    if (index !== -1 && array[index].length < 4){array.splice(index, 1)}
    if (array.length > 16) { array.length = 16; }
  };

  shortenMe(textsArrayRaw);
  
  linksArrayRaw = trimMe(linksArrayRaw);
  shortenMe(linksArrayRaw);

  console.log(textsArrayRaw);
  console.log(linksArrayRaw);
  let articlesArray = [];
  let pagelink = [];
  for (let [index, link] of linksArrayRaw.entries()) {
    // console.log(index, link);
    pagelink[index] = await browser.newPage();
    await pagelink[index].goto(link);
    // await pagelink[index].waitFor(1000);
    let leadText = await pagelink[index].evaluate(() => {
      let text = document.querySelector('#lead').innerText;
      return text;
    });
    const paragraphArrayRaw = await pagelink[index].evaluate(() => [...document.querySelectorAll('#detail > .hyphenate')].map(elem => elem.innerText));
    paragraphArrayRaw.pop();
    paragraphArrayRaw.unshift(leadText);
    articlesArray.push(paragraphArrayRaw);
    // console.log(leadText);
    // console.log(paragraphArrayRaw);
  }
  console.log(articlesArray[0]);
  browser.close();
})();
