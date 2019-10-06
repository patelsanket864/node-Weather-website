const request=require('request')

const geocode=(address,callback)=>{
    const geocodingurl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?limit=2&access_token=pk.eyJ1IjoicGF0ZWxzYW5rZXQ4NjQiLCJhIjoiY2sxOHg5bW14MG0zZzNobzFnZW1oYmgybCJ9.cF84T8iZsxEXAMen_ddjPA'
    request({url:geocodingurl,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect with weather service!!',undefined)
        }
        else if(response.body.features.length===0){
            callback({error:'This loacation is not available!!'},undefined)
        }
        else{
        
            callback(undefined,{
                'latitude':response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            })
        }
    })
}
const Weather=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/48cdaa8641836f9fcff04eeac35d1dc0/'+latitude +','+longitude+'?lang=en&units=si'

    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("Unable to connect with weather service!!",undefined)
        }
        else if(response.body.error){
            callback("Unable to find location for this coordinates",undefined)
        }
        else{

            callback(undefined,response.body.daily.data[0].summary+'Currently the temperature is '+ response.body.currently.temperature+' degrees. There is '+response.body.currently.precipProbability+'% chance of rain.\n Maximum temperature of the day is '+response.body.daily.data[0].temperatureHigh+' and Minimum temperature is '+response.body.daily.data[0].temperatureLow+'.')
        }
        
    })
}

module.exports={
    geocode:geocode,
    Weather:Weather
}