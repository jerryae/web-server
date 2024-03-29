// node core modules
const path = require('path');
// npm modules and other
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const port = process.env.PORT || 3000;

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine views location
app.set('view engine','hbs'); // dynamic page with templating
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Antonio'
    });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Antonio',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Antonio',
    message: 'Help message'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide address term in query'
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({error});
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({error});
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });
    });
  });
});

/* app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error:'You must provide search term in query'
    });
  }
    res.send({
      products: []
    });
}); */

app.get('/help/*', (req, res) => { // /help/* match page doesn't exists
    res.render('404', {
      title: '404',
      name: 'Antonio',
      message: 'Help article not found'
    });
});

app.get('*', (req, res) => { // * match page doesn't exists
    res.render('404', {
      title: '404',
      name: 'Antonio',
      message: 'Page not found'
    });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
});
