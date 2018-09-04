const yargs = require('yargs');

const geocode =require('./geocode/geocode');

const weather = require('./weather/weather');

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

geocode.geoCodeAddress(argv.address,(errorMsg,result)=>{
  if(errorMsg){
    console.log(errorMsg);
  }else{
    console.log(result.area);
    weather.weather(result.lat,result.lng,(errorMsg,weatherResult)=>{
      if(errorMsg){
        console.log(errorMsg);
      }else {
        console.log(JSON.stringify(weatherResult,undefined,2));
      }
    });
  }
});
