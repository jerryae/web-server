const request = require('request');


const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoiamVycnlhZSIsImEiOiJja2ZnaTNpN28wb3JvMnRxdnkyNmRmZHBwIn0.9QoBuYT7asE2-PbNEAv-BA&limit=1';
  request({ url: url, json: true }, (error, {body} = {}) => {
    if (error) {
      callback('Unable to connect to geocode service!', undefined);
    } else {
      const data = body;
      if (data.features.length === 0) {
        callback('Unable to find location. Try another search.', undefined);
      } else {
        const latitude = data.features[0].center[1];
        const longitude = data.features[0].center[0];
        const location = data.features[0].place_name;
        callback(undefined, {
          latitude,
          longitude,
          location,
        });
      }
    }
  });
};

module.exports = geocode;
