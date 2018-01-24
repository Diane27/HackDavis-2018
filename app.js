const express = require('express');
const app = express();
const helmet = require('helmet');
const yesHttps = require('yes-https');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const nunjucks = require('nunjucks');
const config = require('./config.js');
const router = require('./routes');

if (config.production) {
  // Force https
  // app.use(logger('common'));
  // app.use(helmet());
  // app.use(yesHttps());
} else {
  app.use(logger('dev'));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));

// Set "./views" as the views folder
nunjucks.configure(path.join(__dirname, 'views'), {
  express: app,
  noCache: !config.production
});

// Set default template extension to .html
app.set('view engine', 'html');

app.locals.css = ['/css/style.css'];
app.locals.js = [
  'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js',
  '/js/map.js',
  '/js/nav.js',
  '/js/smoothScrolling.js',
  '/js/dir.js',
  '/js/auth.js',
  '/js/edit.js',
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyDwQwhDwtBQxmyThKoI78uTkdM86yyro20&libraries=places&callback=initMap'
];

app.use(router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = config.production ? {} : err;

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const server = app.listen(config.port, () => {
  console.log(`=> working on http://${server.address().address}:${config.port}`);
});
