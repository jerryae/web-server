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
        const temperature = data.current.temperature;
        const precipitation = data.current.precip;
        const humidity = data.current.humidity;
        /* callback(undefined, {
          weatherDescription: weather_description,
          temperature: temperature,
          precipitation: precipitation,
        }); */
        callback(
          undefined,
          `${weather_description}. It is currently ${temperature} degrees out. There is a ${precipitation}% chance of rain. The humidity is ${humidity}%.`
        );
      }
    }
  });
};

module.exports = forecast;
