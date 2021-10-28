const express = require('express');
const path = require('path');
//const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
//const session = require('express-session');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const expressValidator = require('express-validator');
//const mongo = require('mongodb');

const routes = require('../routes/index');
const posts = require('../routes/posts');
const categories = require('../routes/categories');


module.exports = function(app) {
    app.locals.moment = require('moment');

    app.locals.truncateText = function(text, length){
    const truncatedText = text.substring(0, length);
    return truncatedText;
    }

    app.set('views', path.join('./', 'views'));
    app.set('view engine', 'jade');

    //app.use(express.json());
    app.use('/', routes);
    app.use('/posts', posts);
    app.use('/categories', categories);
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(expressValidator({
        errorFormatter: function(param, msg, value) {
            var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;
        
            while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
            }
            return {
            param : formParam,
            msg   : msg,
            value : value
            };
        }
        }));

    app.use(cookieParser());
    app.use(require('connect-flash')());
    app.use(function (req, res, next) {
        res.locals.messages = require('express-messages')(req, res);
        next();
    });

    app.use(express.static(path.join('./', 'public')));
  }