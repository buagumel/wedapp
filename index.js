import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import env from "dotenv";

const app = express();
const port = 3000;
const APIKEY = process.env.APIKEY

env.config();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    res.render("index.ejs", {

    });
})



app.post("/search", async (req, res) => {

    const town = req.body["search"];


    try {

        const response = await axios(`http://api.openweathermap.org/geo/1.0/direct?q=${town}&limit=2&appid=d2c528dcb43e04de3a5422ec59b42efb`);
        const townCo1 = response.data[0];
        const townCo2 = response.data[1];

        const name = townCo1.name;
        const name2 = townCo2.name;
        const country = townCo1.country;
        const state = townCo1.state;
        const country2 = townCo2.country;
        const state2 = townCo2.state;
    
        const lat_town_1 = townCo1.lat;
        const lon_town_1 = townCo1.lon;
        const lat_town_2 = townCo2.lat;
        const lon_town_2 = townCo2.lon;


        try {

            const response = await axios(`https://api.openweathermap.org/data/2.5/weather?lat=${lat_town_1}&lon=${lon_town_1}&appid=d2c528dcb43e04de3a5422ec59b42efb`);
            const response_2 = await axios(`https://api.openweathermap.org/data/2.5/weather?lat=${lat_town_2}&lon=${lon_town_2}&appid=d2c528dcb43e04de3a5422ec59b42efb`);

            const townWeather = response.data.weather[0];
            const townWeather_2 = response_2.data.weather[0];
            const townMain = response.data.main;
            const townMain_2 = response_2.data.main;
            
            const temp = Math.round(townMain.temp - 273);
            const press = townMain.pressure;
            const humi = townMain.humidity;
            const temperature2 = Math.round(townMain_2.temp - 273);
            const press2 = townMain_2.pressure;
            const humi2 = townMain_2.humidity;

            const mainWeather2 = response_2.data.weather[0].main;

            
            
        

            res.render("index.ejs", {
                weather: townWeather,
                weather_2: townWeather_2,
                main: townMain,
                main_2: mainWeather2,
                temperature: temp,
                pressure: press,
                humidity: humi,
                temp2: temperature2,
                pressure2: press2,
                humidity2: humi2,
                name: name,
                name2: name2,
                country: country,
                country2: country2,
                state: state,
                state2: state2,
                lat: lat_town_1,
                lon: lon_town_1,
                lat2: lat_town_2,
                lon2: lon_town_2

            });


        } catch (error) {

            console.log(error);

        }




    } catch (error) {
        console.log(error)

        res.redirect("/");

    }

});





app.listen(port, () => {
    console.log(`Server running at ${port}`);
});