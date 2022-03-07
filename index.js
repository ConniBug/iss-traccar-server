const config = require("./config.json");

const request = require('request');
const l = require('@connibug/js-logging');
l.setLogLevel(config.logLevel);

var location_history = [];

function traccarResponce(error, response, body) {
  l.verbose("Recieved by traccar.")
  if(error) {
    l.error(error);
    l.error(body);
  }
  l.verbose("Finished thread execution.");
}

function handleISSResponseData(error, response, body) {
  l.verbose("Recieved ISS Data.");
  l.verbose(body)
  if(error) {
    l.error(error);
    return;
  }
  body = JSON.parse(body);
  location_history.push(body);
  l.debug("Pushed: lat-" + body.latitude + "- long-" + body.longitude + "- alt-" + body.altitude + "- velocity-" + parseInt(body.velocity) * 1.852);

  const url = `${config.traccar.protocol}://${config.traccar.hostname}:${config.traccar.port}`;
  l.verbose("Sending data to traccar.");
  
  // Build URL sending data to Traccar Server.
  request(`${url}/?id=${config.traccar.iss_id}&lat=${body.latitude}&lon=${body.longitude}&timestamp=${body.timestamp}&hdop=100&altitude=${body.altitude}&speed=${parseInt(body.velocity) * 1.852}`, traccarResponce);
  l.verbose(`${url}/?id=${config.traccar.iss_id}&lat=${body.latitude}&lon=${body.longitude}&timestamp=${body.timestamp}&hdop=100&altitude=${body.altitude}&speed=${parseInt(body.velocity) * 1.852}`)
}

function processISSLocation(debug = false) {
    l.verbose("Sending ISS Location request.");
    l.verbose("[GET] [https] [api.wheretheiss.at] /v1/satellites/25544");
    request('https://api.wheretheiss.at/v1/satellites/25544', handleISSResponseData);
}

l.verbose("Starting tracking.");
processISSLocation();
const interval = setInterval(function() {
  processISSLocation();
}, config.timeBetweenLocationChecks);


