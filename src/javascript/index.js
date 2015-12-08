var util = require("util");
var Transform = require("stream").Transform;
var Readable = require("stream").Readable;

util.inherits(UpperStream, Transform);

function UpperStream(options) {
    Transform.call(this, options);
}

UpperStream.prototype._transform = function(chunk, encoding, done) {
    for (var i = 0; i < chunk.length; i++) {
        if (chunk[i] >= 97 && chunk[i] <= 122) {
            chunk[i] = chunk[i] - 32;
        }
    }
    this.push(chunk);
    done();
    console.log("haha");
}

var upper = new UpperStream();

var a = new Readable;

a.push("abcd");
a.push("AbcD");
a.push("ab CD");
a.push("abC d \n");
a.push("WHAT");
a.push("you are Welcome!");
a.push(null);

a.pipe(upper).pipe(process.stdout);