require('dotenv').config();
const express = require('express'); //mandatory statement
const Datastore = require('nedb');
const fetch = require('node-fetch');


const app = express(); //storing express into a varible
app.listen(3000, () => console.log("first listen at 3000")); //creating a localhost:3000
app.use(express.static('public')); //express method to host a static page
app.use(express.json({ limit: '1mb' })) //converting the incoming data json using express

const database = new Datastore('database.db');
database.loadDatabase();


app.get('/database', (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }

        response.json(data)
    })


})

app.post('/api', (request, response) => {
    console.log(request.body);
    const coords = request.body;
    database.insert(coords);

    const timestamp = Date.now();
    coords.timestamp = timestamp; //creating a timestamp object inside coords
    response.json(coords);

})

//making of a proxy server with an endpoint in order to access the lat and long from index.html


app.get('/weather/:latlong', async (request, response) => {
    console.log(request.params)
    const latlong = request.params.latlong.split(','); //here we are getting the lat and long through the route parameters.
    //but here the route parmeters returns 3 params but we only need 2 of them i.e latlong[0] and latlong[1]
    console.log(latlong)
    const lat = latlong[0];
    const long = latlong[1];
    console.log(lat, long);
    const API_KEY_WEATHER = process.env.API_KEY_WEATHER;
    const weather_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly,daily&appid=${API_KEY_WEATHER}`;
    //const api_url = `https://api.openweathermap.org/data/2.5/onecall?lat=10.85&lon=76.27&exclude=minutely,hourly,daily&appid=${API_KEY}`;
    const weather_response = await fetch(weather_url);
    const weather_data = await weather_response.json();
    response.json(weather_data);
});


app.get('/aq', async (request, response) => {
   
  
    
    const API_KEY_AQ = process.env.API_KEY_AQ;
    const aq_url = `http://api.airvisual.com/v2/nearest_city?key=${API_KEY_AQ}`;
    const aq_response = await fetch(aq_url);
    const aq_data = await aq_response.json();
    response.json(aq_data);
})