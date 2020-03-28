const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs"); // serve view engine template."hbs" - handlebars npm package for express
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)); // serve static files

// Root route
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Uğur DEDE"
  });
});

// About route
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Uğur DEDE"
  });
});

// Help route
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Uğur DEDE",
    message: "This is some helpful text."
  });
});

// Weather route
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address."
    });
  }
  // geocode the address to get coordinates (lat,long)
  geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
    if (error) {
      return res.send({ error: error });
    }
    // Use the coordinates to provide forecast
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error: error });
      }

      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term."
    });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Uğur DEDE",
    errorMessage: "Help article not found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Uğur DEDE",
    errorMessage: "Page not found"
  });
});

// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
