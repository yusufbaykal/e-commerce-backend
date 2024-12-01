const express = require('express');
const router = express.Router();

const fs = require('fs'); 
let routes = fs.readdirSync(__dirname);

for (let route of routes) {
  if (route.endsWith('.js') && route !== 'index.js') {
    const routePath = require('./' + route);
    if (typeof routePath === 'function') { 
      router.use('/' + route.replace('.js', ''), routePath);
    } else {
      console.error(`${route} is not a valid route`);
    }
  }
}

module.exports = router; 