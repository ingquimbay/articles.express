var express = require('express');
var router = express.Router();
var Articles = require('../models/articles');

/* GET articles listing. */
router.get('/', function (req, res, next) {
  Articles.find({}, function (err, articles) {
    if (err) {
      return res.json({
        'success': false,
        'error': err
      });
    }
    return res.json({
      'success': true,
      'articles': articles
    });
  });
});


/* GET aticle by id */
router.get('/:articleId', function (req, res) {
  var articleId = req.params.articleId;
  Articles.findOne({
    '_id': articleId
  }, function (err, article) {
    if (err) {
      return res.json({
        'success': false,
        'error': err
      });
    }
    return res.json({
      'success': true,
      'article': article
    });
  });
});

module.exports = router;
