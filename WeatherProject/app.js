const { response } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

    const city = req.body.city;
    const apiKey = "eb12107fe5e2d2ce4c862c567bb59241";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function(response) {
        console.log(response.statusCode);


    response.on("data", function(data) {
        const weatherData = JSON.parse(data)
        const temperature = weatherData.main.temp;
        const desc = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

        res.write("<h1>The Temperature in " + city + " is " + temperature + " degrees celcius.</h1>");
        res.write("<h1>The weather is currently " + desc + ".</h1>");
        res.write("<img src=" + imageURL + " >");
        res.end();
        })
    })

})




app.listen(3000, function() {
    console.log("Server is running at port 3000");
})