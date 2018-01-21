const express = require('express');
const router = express.Router();
const accounts = require('./accounts.json');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/map', (req, res, next) => {
  res.render('map', {
    js: req.app.locals.js.concat('/js/map.js'),
    css: req.app.locals.css.concat('/css/map.css')
  });
});

router.post('/login', (req, res, next) => {
  if (req.body.username === 'jack' && req.body.password === 'jill') {
    res.json({ data: { loggedIn: true } });
  } else {
    res.status(401);
    res.json({ error: 'Invalid credentials' });
  }
});

router.get('/account', (req, res, next) => {
  const username = req.body.username || req.query.username;

  if (!username || !accounts[username]) {
    res.status(400);
    res.json({ error: 'Need username' });
  } else {
    res.json({ data: accounts[username] });
  }
});

module.exports = router;
