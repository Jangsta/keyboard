const express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  console.log('get route');
  res.sendStatus(500);
});

module.exports = router;