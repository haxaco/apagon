const express = require('express');
const apagonesCollection = 'apagones';
const lugaresCollection = 'lugares';
const router = express.Router();
const {
  getApagonesDBClient,
  validatePostData,
  transformGeoData
} = require('../lib');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile('./public/index.html');
});

// API routes
router.get('/apagon', async (req, res, next) => {
  const dbClient = await getApagonesDBClient();
  const results = await dbClient.find(apagonesCollection);

  res.json({ data: results });
});

router.post('/apagon', async (req, res, next) => {
  const dbClient = await getApagonesDBClient();
  const data = req.body;
  try {
    validatePostData(data);
    const transformedData = transformGeoData({ data } );
    const results = await dbClient.insert(apagonesCollection, transformedData);
    res.json({ data: results });
  } catch(error) {
    console.error(error);
  }
});

router.get('/apagon/:id', async (req, res, next) => {
  const dbClient = await getApagonesDBClient();
  const results = await dbClient.find(apagonesCollection ,{
    _id: req.params
  });

  res.json(results);
});

router.patch('/apagon/:id', async (req, res, next) => {
  const dbClient = await getApagonesDBClient();
  const results = await dbClient.find(lugaresCollection);

  res.json(results);
});

// API routes
router.get('/lugar', async (req, res, next) => {
  const dbClient = await getApagonesDBClient();
  const results = await dbClient.find(lugaresCollection);

  res.json({ data: results });
});


router.post('/lugar', async (req, res, next) => {
  const dbClient = await getApagonesDBClient();
  const data = req.body;
  try {
    validatePostData(data);
    const transformedData = transformGeoData({ data } );
    const results = await dbClient.insert(lugaresCollection, transformedData);
    res.json({ data: results });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;

