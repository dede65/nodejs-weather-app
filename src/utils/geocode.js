const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiZGVkZTY1IiwiYSI6ImNrODMzaHQ5ejBiYjYzZXFrd3RzdGx6ODAifQ.8AOIyzMwwk8r3pw1XM9_Sw&limit=1";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      // response.body.features.length === 0 means no location is provided which is that we likely have an error
      callback("Unable to find location. Try another search term", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
