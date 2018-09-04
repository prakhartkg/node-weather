const yargs = require('yargs');
const axios = require('axios');

const argv = yargs.options({
  a:{
    demand:true,
    alias:'address',
    describe:'Address to get weather',
    string:true
  }
})
.help().alias('help','h')
.argv;

const address = encodeURIComponent(argv.address);
const geoCodeURL=`http://www.mapquestapi.com/geocoding/v1/address?key=zBHahs0iaATOJtBMgwZ3OLvjXrE6eHD1&location=${address}`;


axios.get(geoCodeURL).then((response)=>{
  if(response.data.info.statuscode===400){
    throw new Error('Unable to find address');
  }
  console.log('Area : ', response.data.results[0].locations[0].adminArea4);
  const API_KEY='9f67a2519cccc1110f714b6cd2fb44ad';
  const lat = response.data.results[0].locations[0].latLng.lat;
  const lng = response.data.results[0].locations[0].latLng.lng;
  const weatherURL = `https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}`;
  return axios.get(weatherURL);
}).then((response)=>{
  const temp = response.data.currently.temperature;
  const summary = response.data.currently.summary;
  console.log('TEMP : ',temp,'Condation : ',summary);
}).catch((e)=>{
  if(e.code=='ENOTFOUND')
    console.log('Server Not Recheable');
  else
    console.log(e.message);
});
