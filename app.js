
const express = require("express");
const https = require("https");
const bodyParser = require('body-parser');
const { urlencoded } = require("body-parser");
const app = express();



app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");

})

app.post("/", bodyParser.urlencoded({ extended: true }), (req, res) => {
    console.log(req.body.cityName);
    const query = req.body.cityName;
    const apiKey = "90bd8f98a3e5d2e31a1e4884865066a1";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;


    https.get(url, function (response) {
        

        console.log(response.statusCode);

        response.on("data", function (data) {

            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDes = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>temperature in " + query + " is " + temp + " degree celcius</h1>");
            res.write("weather is currently <em>" + weatherDes + "</em>");
            res.write("</br>");
            res.write(`<img src=${iconURL}>`);
            console.log(icon);
            console.log(iconURL);
            res.send();

        });
    });
});















app.listen(process.env.PORT || 3000, function () {
    console.log("server is running on 3000");
})

















