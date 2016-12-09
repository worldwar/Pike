var parseIfeng = require('./parse').parseIfeng,
    parseCaixin = require('./parse').parseCaixin,
    fs = require('fs');

fs.readFile('0.html', function(error, data) {
    console.log(parseIfeng(data));
});

fs.readFile('1.html', function(error, data) {
    console.log(parseCaixin(data));
});