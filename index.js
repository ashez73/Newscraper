const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
let onetScrape = require('./js/apptest');
const data = onetScrape.scrape().then(function (result) {
  console.log(result);


const app = express()
const port = 3000;
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'))

app.get('/on', (request, response) => {
  response.render('test', {
    name: 'Leszczu',
    displayData: onetScrape.myData.json
    
 
  })
  onetScrape = require('./js/apptest');
})


app.get('/', (request, response) => {
  response.render('home', {
    name: 'Kutasie',
    nice: function niceOrNot (){
      let chance = Math.random(); 
      chance >0.5? string ='nice': string = 'not nice';
      return string;},
    displayData: result.title,
    displayTime: result.time
    //displayData: ohetScrape.title
    
 
  })


})



app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
});

