const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

exports.routingSetUp = () => {
  const app = express();
  // local only
  // const port = 5000;
  // or heroku
  const port = process.env.PORT || 5000;
  app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, '../views/layouts')
  }));
  app.set('view engine', '.hbs');
  app.set('views', path.join(__dirname, '../views'));
  app.use(express.static('../public'));
  return {port, app};
};
