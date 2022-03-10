var express = require('express');
var router = express.Router();
var exchange = require('../model/exchangeModel');

/* GET home page. */
router.get('/:source/:target/:amount', function(req, res, next) {
  let source = req.params.source.toUpperCase();
  let target = req.params.target.toUpperCase();
  let amount = req.params.amount;
  if (!source || !target || !amount || isNaN(amount)) {
    res.sendStatus(400); 
    return;
  }
  res.json(exchange.calculateExchange(source, target, parseFloat(amount)));
});

router.post('/:source/:target/:rate', function(req, res, next) {
  let source = req.params.source.toUpperCase();
  let target = req.params.target.toUpperCase();
  let rate = req.params.rate;
  if (!source || !target || !rate || isNaN(rate)) {
    res.sendStatus(400); 
    return;
  }
  res.json(exchange.updateExchangeRate(source, target, parseFloat(rate)));
});

module.exports = router;
