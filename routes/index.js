'use strict';
var express = require('express');
var router = express.Router();
var request = require('request');
var http = require('http');
var url = require('url');
const cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.param('article', function(req, res, next, href) {
  var text;
  var $ = null;
  req.text = [];
  request('http://www.lanacion.com.ar/' + href,
      function (error, response, html) {
        if (!error && response.statusCode == 200) {
          $ = cheerio.load(html);
          $('article#nota').find('aside').remove();
          $('article#nota').find('h1,h2,h3,p').each(function(i, element) {
            req.text.push($(this).text().toString());
          });
          //req.text = text.toString();
          next();
        }
      });
});

router.get('/lanacion/:article', function (req, res, next) {
   res.render('lanacion_article', {
     title : 'Article',
     text  : req.text
   });
});

router.get('/lanacion', function (req, res, next) {
  let result = [];
  var $ = null;
  request('http://www.lanacion.com.ar', function  (error, response, html) {
      if (!error, response.statusCode == 200) {
        $ = cheerio.load(html);
        ($('article').find('h1,h2').find('a')).each( function (index, element) {
          result.push({
             'href' : $(this).attr('href'),
             'text' : $(this).text().toString()
          });
        });
        res.render('lanacion', { 
          title: 'Links La Nacion',
          links: result
        });
      }
      });
});


module.exports = router;
