const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/map', (req, res, next) => {
  res.render('map', {js:req.app.locals.js.concat('/js/map.js'), css:req.app.locals.css.concat('/css/map.css')});
});

module.exports = router;
