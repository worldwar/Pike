var cheerio = require('cheerio'),
    moment = require('moment'),
    fs = require('fs');

function parseIfeng(data) {
    $ = cheerio.load(data);
    
    var datePublished = $(".p_time span[itemprop='datePublished']").text();
    var origin = $("span[itemprop='publisher'] span[itemprop='name']").text();
    var s = datePublished.replace("年", "-").replace("月", "-").replace("日", "");
    var date = moment(s).toDate();
    
    var content = $('#main_content > p').map(function(i, element) {
        return $(this).text();
    }).get();
    
    return {
        "title": $('#artical_topic').text(),
        "date": date,
        "content": content,
        "from": "ifeng",
        "origin": origin
    };
}

function parseCaixin(data) {
    $ = cheerio.load(data);

    var content = $('#Main_Content_Val > p').map(function(i, element) {
        return $(this).text().trim();
    }).get();
    return {
        "title": $('#conTit h1').text(),
        "date": moment($('#pubtime_baidu').text()).toDate(),
        "content": content,
        "from": "caixin",
        "origin": $('#source_baidu>a').text()
    }
}

exports.parseIfeng = parseIfeng;
exports.parseCaixin = parseCaixin;