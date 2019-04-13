var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile('./public/index.html');
});

// API routes
router.get('/apagon', function (req, res, next) {
  let result = {
    data: [
      {
        location: {
          type: "point",
          coordinates: [ 0.4683841,-66.9604058 ]
        },
        source: '',
        create_at: '2019-04-13 01:00:00',
        type: ''
      }
    ]
  };

  res.json(result);
});


router.post('/apagon', function (req, res, next) {

  const data = req.body;
  res.render('index', { title: 'Express' });
});

module.exports = router;
