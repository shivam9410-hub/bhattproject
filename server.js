const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const bodyparser = require("body-parser");
const jsonParser = bodyparser.json();

const corsOptions = {
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(jsonParser);
app.use(bodyparser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server is running at port 5000");
});

const cache = require("memory-cache");

app.post("/temp", async function (req, res) {

 const place =req.body.city 
 const apiKey=req.body.apiKey
 const  units=req.body.units;
console.log(place)

  const cachedData = cache.get(place);
  if (cachedData) {
    res.send(cachedData);
    return;
  }

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}&units=${units}`;
  const data = await fetch(URL)
    .then((d) => {
      return d.json();
    })
    .then((d) => {
      console.log(d);
      return d;
    });

  const tempofplace = JSON.stringify({ data: data });
  cache.put(place, tempofplace, 5 * 60 * 1000);
  return res.send(tempofplace);
});
