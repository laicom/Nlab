
/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , http = require('http')
    , path = require('path')
    ,appSettings=require('./appsettings.js').appSettings;

var app = express();

// all environments
app.set('port', process.env.PORT || appSettings.serverPort);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('appSettings', appSettings);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

routes(app);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
