var os = require('os');
var ip;

var localAddresses = os.networkInterfaces();
Object.keys(localAddresses).forEach(function(key) {
  localAddresses[key].forEach(function(obj) {
    if(!obj.address.search(/[^:a-z]+/) && obj.address !== '127.0.0.1') {
      ip = obj.address;
    }
  })
})

module.exports = {
  ip: ip
};
