const request = require("request");
const geocode = (address, callback)=>{
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibXVoYW1tZWRuYXNzZXIiLCJhIjoiY2thYWp3enltMGQ2MzJxcDk3a3ZpcGNqOSJ9.M_BjA3L17hvDo3QYZxtUiQ&limit=1';
    request({url:geocodeURL, json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to location service!',undefined);
        }else if(response.body.features.length === 0){
            callback('Unable to find location .. try anther search.',undefined);
        }else{
            callback(undefined, {
                'longitude': response.body.features[0].center[1],
                'latitude': response.body.features[0].center[0],
                'location': response.body.features[0].place_name
            })
        }
    });
}
module.exports = geocode;