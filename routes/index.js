const express = require('express');
const router = express.Router();
const { getApagonesDBClient, getLugaresDBClient }= require('../lib');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile('./public/index.html');
});

// API routes
router.get('/apagon', async (req, res, next) => {
  const dbClient = await getApagonesDBClient();
  const results = await dbClient.find();

  res.json({ data: results });
});


router.post('/apagon', async (req, res, next) => {
  const dbClient = await getApagonesDBClient();
  const data = req.body;
  try {

    const results = await dbClient.insert(data);
    res.json({ data: results });
  } catch(error) {
    console.error(error);
  }
});

// API routes
router.get('/lugar', async (req, res, next) => {
  const dbClient = await getLugaresDBClient();
  const results = await dbClient.find();

  res.json({ data: results });
});


router.post('/lugar', async (req, res, next) => {
  const dbClient = await getLugaresDBClient();
  const data = req.body;
  try {
    const results = await dbClient.insert(data);
    res.json({ data: results });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;

