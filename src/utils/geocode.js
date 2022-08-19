const request = require('request');
const geocode = (address, callback) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoidmlzaGFsNTRzaGFybWEiLCJhIjoiY2w2cWFqc25tMDRtNzNqbGo4N2ttMXFlaCJ9.oLTOdkTkuK7036ej7ZOAcQ&limit=1";

    request({url,json:true},(error,{body})=>{
        
        if(error){
            callback("Unable to connect to location services",undefined)
        }
        else if(body.message){
            callback("Unable to find location.",undefined)

        }
        else{
            callback(undefined,body.features[0].center)
        }
        

        
    })
    

}



module.exports = geocode