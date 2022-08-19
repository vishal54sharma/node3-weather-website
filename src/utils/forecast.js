const request = require('request');
const forecast=(lat, lon,callback)=>{

    const url="http://api.weatherstack.com/current?access_key=2119f584a754888574b7eedd525b6e69&query="+encodeURIComponent(lat)+","+encodeURIComponent(lon);

    request({url,json:true},(error,{body})=>{
        if(error){
            callback("Unable to connect to weather service.",undefined)
        } else if(body.error){
            callback("Unable to find the location",undefined);
        
        } else
            callback(undefined,body.current.temperature);
        
        });



}

module.exports = forecast;