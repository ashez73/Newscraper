const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

exports.routingSetUp = () => {
  const app = express();
  const port = 3000;
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
