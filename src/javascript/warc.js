var Warc = require('warc'),
    fs = require('fs'),
    mongdb = require('mongodb'),
    async = require('async'),
    parseIfeng = require('./parse').parseIfeng;

var MongoClient = mongdb.MongoClient;
var w = new Warc();
var url = "mongodb://localhost:27017/news";

var newsDB;
var pages = [];
var collection;

function connection(done) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log("failt to connection mongodb");
        } else {
            console.log("login in!");
            newsDB = db;
            console.log("db is " + db);
            collection = db.collection('news');
            done(null);
        }
    });
};

function tryConnect() {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log("failt to connection mongodb");
        } else {
            console.log("login in!");
            newsDB = db;
            console.log("db is " + db);
            collection = db.collection('news');
            parse_warc();
        }
    });
}


function parse_warc() {
    var i = 0;
    fs.createReadStream('/home/zhuran/binary/WEB-20151102120804562-00000-3838~localhost~9955.warc').pipe(w).on('data', function (data) {
        i = i + 1;
        console.log("reading %d page", i);
        
        var page = parseIfeng(data.content.toString("UTF-8"));
        if (newsDB) {
            storePage(collection, page);
        }
    });
};

function store(collection, pages) {
    for (var i = 0; i < pages.length; i++) {
        collection.insert(pages[i], function (err, result) {
            console.log("insert document " + result);
        });
        console.log("insert %d page successfully.", i);
    }
    newsDB.close();
}

function storePage(collection, page) {
    collection.insert(page, function (err, result) {
        console.log("insert document " + result);
    });
}

tryConnect();