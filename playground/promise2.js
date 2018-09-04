const request = require('request');
 const geocode=(address)=>{
   const encoded = encodeURIComponent(address);
   return new Promise((resolve,reject)=>{
     request({
       url:`http://www.mapquestapi.com/geocoding/v1/address?key=zBHahs0iaATOJtBMgwZ3OLvjXrE6eHD1&location=${encoded}`,
       json:true
     },(error, response, body)=>{
       if(error){
         reject('Error While Fetching address');
       }else if(body.info.statuscode==400){
         reject(body.info.messages[0]);
       }else if(response.statusCode==200){
         var result = body.results[0].locations[0];
         if(result){
          resolve({
            area:result.adminArea4,
            lat:result.latLng.lat,
            lng:result.latLng.lng
          });
         }
       }
       });
   });
 };


 geocode('bangalore karnataka').then((location)=>{
   console.log(JSON.stringify(location,undefined,2));
 },(errorMsg)=>{
   console.log(errorMsg);
 });
