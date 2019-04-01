var app = require('express')();
var http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.MODE == 'dev' ? 3000 : 80;

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/on', (req, res) => {
  res.send('Encender');
  io.emit('on', 'HIGH');
});

app.get('/off', (req, res) => {
  res.send('Apagar');
  io.emit('off', 'LOW');
});

io.on('connection', function (socket) {
  console.info(`Client connected [id=${socket.id}]`);

  // when socket disconnects, remove it from the list:
  socket.on("disconnect", () => {
    sequenceNumberByClient.delete(socket);
    console.info(`Client gone [id=${socket.id}]`);
  });
});

http.listen(port, function () {
  console.log(`listening on *:${port}`);
});