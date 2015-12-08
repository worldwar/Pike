var parseIfeng = require('./parse').parseIfeng,
    fs = require('fs');

fs.readFile('0.html', function(error, data) {
    console.log(parseIfeng(data));
});