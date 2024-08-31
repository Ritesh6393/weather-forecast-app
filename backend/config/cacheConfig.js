const NodeCache=require('node-cache')


const cache = new NodeCache({
    stdTTL: 3600, 
    checkperiod: 600, 
    maxKeys: 100, 
  });
  
module.exports = cache;