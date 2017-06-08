'use strict';
const cheerio = require('cheerio');

class lanacionParser {

  static parseArticle(document) {
    var $ = null;
    var text = [];
    $ = cheerio.load(document);
    $('article#nota').find('aside').remove();
    $('article#nota').find('h1,h2,h3,p').each(function(i, element) {
      req.text.push($(this).text().toString());
    });
  }

  static parseLinks(document) {
    var $ = null;
    var result = [];
    $ = cheerio.load(document);
    ($('article').find('h1,h2').find('a')).each( function (index, element) {
      result.push({
        'href' : $(this).attr('href'),
        'text' : $(this).text().toString()
      });
    });
  }


}
