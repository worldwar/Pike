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

exports.parseIfeng = parseIfeng;
