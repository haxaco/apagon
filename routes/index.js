const express = require('express');
const path = require('path');
const apagonesCollection = 'apagon';
const lugaresCollection = 'lugares';
const router = express.Router();
const {
  getApagonesDBClient,
  validatePostData,
  transformGeoData
} = require('../lib');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
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

router.get('/apagon/near', async (req, res, next) => {
  const { lat, lng, max_distance, min_distance } = req.query;
  const dbClient = await getApagonesDBClient();

  const query = {
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [parseFloat(lng), parseFloat(lat)]
        },
        $maxDistance: parseFloat(max_distance),
        $minDistance: parseFloat(min_distance)
      }
    }
  };
  try {
    const results = await dbClient.find(apagonesCollection, query);
    res.json(results);
  }catch(error) {
    throw error;
  }
})
router.get('/apagon/:id', async (req, res, next) => {
  const dbClient = await getApagonesDBClient();
  const results = await dbClient.find(apagonesCollection ,{
    _id: req.params
  });

  res.json(results);
});

// API routes
router.get('/lugar', async (req, res, next) => {
  const dbClient = await getApagonesDBClient();
  const results = await dbClient.find(lugaresCollection);

  res.json({ data: results });
});

router.get('/lugar/near', async (req, res, next) => {
  const { lat, lng, max_distance, min_distance } = req.query;
  const dbClient = await getApagonesDBClient();

  const query = {
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [parseFloat(lng), parseFloat(lat)]
        },
        $maxDistance: parseFloat(max_distance),
        $minDistance: parseFloat(min_distance)
      }
    }
  };
  try {
    res.json(await dbClient.find(lugaresCollection, query));
  }catch(error) {
    throw error;
  }
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

