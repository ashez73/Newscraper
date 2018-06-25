const puppeteer = require('puppeteer');
const onet = require('./onet');

  let scrape = async () => {
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

  //console.log(textsArrayRaw);
  //console.log(linksArrayRaw);
  function combineToObject(...args) {
    /*combine arrays into JSON object
    */
   function Entry (title, link) {
       this.title = title;
       this.link = link;
   }
   let master =[];
   let wrapper = {};
   for (let x = 0; x < args[1].length; x++) {
       let entry = new Entry(args[0][x], args[1][x]);
       master.push(entry);       
       }
   
   wrapper.newsFeed = master;
   return wrapper; 
}
dataOn = combineToObject(textsArrayRaw, linksArrayRaw);
let json = JSON.stringify(dataOn);
//console.log(json);
browser.close();
let output ={};
output.json = json;
output.title = textsArrayRaw;
return output;
};
module.export = scrape();
let onetScrape = scrape().then(function(onetScrape){
 // console.log (onetScrape);
 // const exportMe = onetScrape;
 exports.myData = onetScrape;
});
