const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));
const axios = require("axios");
const { response } = require("express");
app.get("/", function (req, res) {
   res.sendFile(__dirname + "/index.html");

});


app.post("/", function (req, res) {
    const location = req.body.cityName;
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=0a69c33a749fb857c93c946ccf19f681&units=metric&q=${location}`;
    axios.get(url).then(response=>{
        const weatherData = response.data;
        const temperature = weatherData.main.temp
        console.log(temperature);
        if(weatherData.cod === 200){
            console.log(weatherData.cod );
        }
    });
    
});

app.listen("3000", function () {
    console.log("server is running on port 3000....")
});