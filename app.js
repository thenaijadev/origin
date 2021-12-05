const express = require("express");
const https = require("https");
const app = express();
app.set("view engine", 'ejs');

const bodyParser = require("body-parser");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
const axios = require("axios");
const {
    response
} = require("express");
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");

});


app.post("/", function (req, res) {
    const city = req.body.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=0a69c33a749fb857c93c946ccf19f681&units=metric&q=${city}`;
    axios.get(url).then(response => {
        const weatherData = response.data;
        const temperature = weatherData.main.temp
        const country = weatherData.sys.country;
        const description = weatherData.weather[0].description
        console.log(description);
        res.render("weather", {
            temperature: temperature,
            city: city,
            country: country,
            description:description
        });


    });

});

app.listen("3000", function () {
    console.log("server is running on port 3000....")
});

