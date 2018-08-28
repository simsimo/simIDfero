'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

server.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});

var listDesinducateur = new Array();

io.on('connection', function (socket) {
    console.log("connexion ok - ID attribué au client" + socket.id)
    if (listDesinducateur.length > 0) {
        listDesinducateur.forEach((element) => {
            io.emit('cree', { nom: element.nom })       
        });
    }

    socket.on('creer', function (data) {
        var nvID = {
            nom: data.nom,
            bit_1: { adr: data.bit_1, value: "" },
            bit_2: { adr: data.bit_1 + 1, value: "" },
            bit_3: { adr: data.bit_1 + 2, value: "" },
            bit_4: { adr: data.bit_1 + 3, value: "" },
            bit_5: { adr: data.bit_1 + 4, value: "" },
            bit_6: { adr: data.bit_1 + 5, value: "" },
            text: ""
        }
        listDesinducateur.push(nvID)
        socket.emit('cree', { nom: data.nom });
    });
});


// communication API
var modbus = require("modbus-stream");

modbus.tcp.connect(502, "192.168.0.25", { debug: ""/*"automaton-2454"*/ }, (err, connection) => {
    // do something with connection
    setInterval(() => {
        if (listDesinducateur.length > 0) {
            listDesinducateur.forEach((element) => {
                connection.readCoils({ address: element.bit_1.adr, quantity: 6 }, (err, res) => {

                    console.log("data - " + res.response);
                    element.bit_1.value = res.response.data[0];
                    element.bit_2.value = res.response.data[1];
                    element.bit_3.value = res.response.data[2];
                    element.bit_4.value = res.response.data[3];
                    element.bit_5.value = res.response.data[4];
                    element.bit_6.value = res.response.data[5];

                    element.text = res.response.data[5].toString() + res.response.data[4].toString() + res.response.data[3].toString()
                        + res.response.data[2].toString() + res.response.data[1].toString() + res.response.data[0].toString();

                    //broadcast value
                    io.emit('mja', { nom: element.nom, valeur: element.text });
                })
            });
        } 
    }, 100)
});
