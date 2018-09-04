const request = require('request');

var geoCodeAddress=(address,callback)=>{
  const encoded = encodeURIComponent(address);
  request({
    url:`http://www.mapquestapi.com/geocoding/v1/address?key=zBHahs0iaATOJtBMgwZ3OLvjXrE6eHD1&location=${encoded}`,
    json:true
  },(error, response, body)=>{
    if(error){
      callback('Error While Fetching address');
    }else if(body.info.statuscode==400){
      callback(body.info.messages[0]);
    }else if(response.statusCode==200){
      var results = body.results[0].locations[0];
      if(results){
        callback(undefined,{
          area:results.adminArea4,
          lat:results.latLng.lat,
          lng:results.latLng.lng
        });
      }
    }
    });
};

module.exports.geoCodeAddress=geoCodeAddress;
