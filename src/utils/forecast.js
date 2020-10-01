const request = require('request');


const forecast = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=30316bbb1576bd06e8cbf97d6fe8079c&query=' +
    encodeURIComponent(latitude) +
    ',' +
    encodeURIComponent(longitude) +
    '&units=m';
  request({ url: url, json: true }, (error, {body} = {}) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else {
      const data = body;
      if (data.error) {
        callback('Unable to find location.', undefined);
      } else {
        const weather_description = data.current.weather_descriptions[0];
        const temperature = data.current.weather_descriptions[0];
        const precipitation = data.current.precip;
        /* callback(undefined, {
          weatherDescription: weather_description,
          temperature: temperature,
          precipitation: precipitation,
        }); */
        callback(
          undefined,
          `${data.current.weather_descriptions[0]}. It is currently ${data.current.temperature} degrees out. There is a ${data.current.precip}% chance of rain.`
        );
      }
    }
  });
};

module.exports = forecast;
