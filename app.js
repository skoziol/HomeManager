var app = require('http').createServer(handler), 
    io = require('/usr/local/lib/node_modules/socket.io').listen(app), 
    fs = require('fs'),
    firmata = require('/usr/local/lib/node_modules/firmata'),
    board = new firmata.Board('/dev/ttyUSB0', arduinoReady);
 
var relay0 = 2;
var relay1 = 3;
var relay2 = 4;
var relay3 = 6;
 
function arduinoReady(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Firmware: ' + board.firmware.name 
      + '-' + board.firmware.version.major 
      + '.' + board.firmware.version.minor);
 

    board.pinMode(relay0, board.MODES.OUTPUT);

    board.pinMode(relay1, board.MODES.OUTPUT);

    board.pinMode(relay2, board.MODES.OUTPUT);

    board.pinMode(relay3, board.MODES.OUTPUT);

}
 
app.listen(8080, "10.16.201.26");
console.log("Listening on http://raspberrypi:8080...");
 
// directs page requests to html files
 
function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
 
    res.writeHead(200);
    res.end(data);
  });
}
 
// this handles socket.io comm from html files
 
io.sockets.on('connection', function(socket) {
    socket.send('connected...');
 
    socket.on('message', function(data) {
        if (data == '0turn on') {
            console.log('0+');
            board.digitalWrite(relay0, board.HIGH);
        }
        if (data == '0turn off') {
            console.log('0-');
            board.digitalWrite(relay0, board.LOW);
        }
        return;
    });

    socket.on('message', function(data) {
        if (data == '1turn on') {
            console.log('1+');
            board.digitalWrite(relay1, board.HIGH);
        }
        if (data == '1turn off') {
            console.log('1-');
            board.digitalWrite(relay1, board.LOW);
        }
        return;
    });

    socket.on('message', function(data) {
        if (data == '2turn on') {
            console.log('2+');
            board.digitalWrite(relay1, board.HIGH);
        }
        if (data == '2turn off') {
            console.log('2-');
            board.digitalWrite(relay1, board.LOW);
        }
        return;
    });

    socket.on('message', function(data) {
        if (data == '3turn on') {
            console.log('3+');
            board.digitalWrite(relay3, board.HIGH);
        }
        if (data == '3turn off') {
            console.log('3-');
            board.digitalWrite(relay3, board.LOW);
        }
        return;
    });
 
    socket.on('disconnect', function() {
        socket.send('disconnected...');
    });
});