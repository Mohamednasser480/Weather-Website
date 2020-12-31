const request = require('request');
const forcast = (addressInfo,callback) =>{
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+addressInfo.latitude+'&lon='+addressInfo.longitude+'&appid=61fbfca2e9dbd998a870ec7351964dcf';
    request({url:url, json: true},(error,response)=>{
        if(error) {
            callback('Unable to connect to weather service!',undefined);
        }else if(response.body.message){
            callback('Unable to find location ..!',undefined);
        }else{
            callback(undefined, {
               'main': response.body.current.weather[0].main,
               'description': response.body.current.weather[0].description,
               'location': addressInfo.location
            });
        }
    });
}
module.exports = forcast;

