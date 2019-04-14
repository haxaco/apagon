function validatePostData(data) {
  if(data.hasOwnProperty('location')) {
    if(!data.location.hasOwnProperty('lat')) {
      throw Error('`lat` property missing from location');
    }
    if(!data.location.hasOwnProperty('lng')) {
      throw Error('`lat` property missing from location');
    }
  } else {
    throw Error('`location` property is required');
  }

  if(!data.hasOwnProperty('type')) {
    throw Error('`type` property is required');
  }
  if(!data.hasOwnProperty('source')) {
    throw Error('`source` property is required');
  }

  return true;
}

function transformGeoData({ geoDataType="Point", data }) {
  const transformedData = data;
  const { lat, lng } = data.location;

  transformedData.location = {
    type: geoDataType,
    coordinates: [ lng, lat ]
  }

  return transformedData;
}

module.exports = {
  validatePostData,
  transformGeoData
}
