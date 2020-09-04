const express = require('express'); //mandatory statement
const Datastore = require('nedb');
const { request } = require('express');

const app = express(); //storing express into a varible
app.listen(3000, () => console.log("first listen at 3000")); //creating a localhost:3000
app.use(express.static('public')); //express method to host a static page
app.use(express.json({ limit: '1mb' })) //converting the incoming data json using express

const database = new Datastore('database.db');
database.loadDatabase();


app.get('/api', (request, response) => {
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