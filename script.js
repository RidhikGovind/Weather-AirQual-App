const express = require('express'); //mandatory statement
const app = express(); //storing express into a varible
app.listen(3000, () => console.log("first listen at 3000")); //creating a localhost:3000
app.use(express.static('public')); //express method to host a static page
app.use(express.json({ limit: '1mb' })) //converting the incoming data json using express
app.post('/api', (request, response) => {
    console.log('yay');
    console.log(request.body);
    const coords = request.body;
    response.json({
        status: 'success',
        latitude: coords.lat,
        longitude: coords.long
    })
})