const request = require("request");

const forecast = (latitue, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/92b4f5f117f0e34ac08134c2ca85e27c/" +
    latitue +
    "," +
    longitude +
    "?units=si";
    
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connec to weather sevice.", undefined);
    } else if (body.error) {
      callback("Unable to find the location!", undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          " It is currently " +
          body.currently.temperature +
          " degress out. The high today is " +
          body.daily.data[0].temperatureHigh +
          " with a low of " +
          body.daily.data[0].temperatureLow +
          ". There is a " +
          body.currently.precipProbability +
          " % chance of rain"
      );
    }
  });
};

module.exports = forecast;
