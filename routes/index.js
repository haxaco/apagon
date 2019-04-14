const express = require('express');
const apagonesCollection = 'apagon';
const lugaresCollection = 'lugares';
const router = express.Router();
const { getApagonesDBClient }= require('../lib');

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

    const results = await dbClient.insert(apagonesCollection, data);
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
    const results = await dbClient.insert(lugaresCollection, data);
    res.json({ data: results });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;

