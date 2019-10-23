var express = require('express');
var router = express.Router();
var Articles = require('../../models/articles');

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


/* POST new article */
router.post('/', function (req, res) {
  Articles.create(new Articles({
    title: req.body.title,
    slug: req.body.slug
  }), function (err, article) {
    if (err) {
      return res.json({
        'success': false,
        article: req.body,
        'error': err
      });
    }
    return res.json({
      success: true,
      article: article
    });
  });
});

/* PUT update existing article */
router.put('/', function (req, res) {
  Articles.findOne({
    '_id': req.body._id
  }, function (err, article) {
    if (err) {
      return res.json({
        success: false,
        error: err
      });
    }
    if (article) {
      let data = req.body;
      if (data.title) {
        article.title = data.title;
      };
      if (data.slug) {
        article.slug = data.slug;
      };
      article.save(function (err) {
        if (err) {
          return res.json({
            success: false,
            error: err
          });
        } else {
          return res.json({
            success: true,
            article: article
          });
        }
      });
    }
  });
});

module.exports = router;
