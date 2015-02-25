var express = require('express'),
swig = require('swig'),
logger = require('morgan'),
path = require('path'),
bodyParser=require('body-parser');

var app = express();

var routes=require('./routes');

app.engine('html', swig.renderFile);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','html');

//use stuff
app.use(logger('dev'));
app.use(bodyParser.json());//not sure if we'll explicityl need this, but... meh
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));
app.use('/',routes);

//errors

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    swig.setDefaults({ cache: false });
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection',function(socket){
	socket.on('soundPitch',function(pitch){
		console.log('Pitch: '+pitch);//send data to server (sorta)
		io.emit('soundPitch',pitch)
	});
});

http.listen(3000,function(){
	console.log('Server listening on port 3000');
})