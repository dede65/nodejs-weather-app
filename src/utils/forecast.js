const request = require("request");

const forecast = (latitue, longitude, callback) => {
  // const key = "92b4f5f117f0e34ac08134c2ca85e27c";
  // const langLat = "37.8267,-122.4233";
  // const url =
  //   "https://api.darksky.net/forecast/" + key + "/" + langLat + "?units=si";

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
          " degress out. there is a " +
          body.currently.precipProbability +
          " % chance of rain"
      );
    }
  });
};

module.exports = forecast;
