const request = require('request');

const API_KEY='9f67a2519cccc1110f714b6cd2fb44ad';

const weather = (lat,lng,callback)=>{
  request({
    url:`https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}`,
    json:true
  },(error,response,body)=>{
    if(!error && response.statusCode===200){
      callback(undefined,{
        temp:body.currently.temperature,
        pressure:body.currently.pressure,
        humidity:body.currently.humidity,
        summary:body.currently.summary
      });
    }else{
      callback('Error while fetching weather');
    }
  });
};
module.exports.weather=weather;
