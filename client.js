const io = require("socket.io-client"),
      ioClient = io.connect("http://134.209.70.254:80/"),
      Board = require('firmata');

ioClient.on("seq-num", (msg) => {
  console.info(msg);
});

Board.requestPort((err, port) => {
  if (err) {
    console.log('error');
    return;
  }
  const board = new Board(port.comName);
  board.on('ready', () => {
    board.pinMode(13, board.MODES.OUTPUT);

    ioClient.on('on', (msg) => {
      console.info(msg);
      board.digitalWrite(13, board.HIGH);
    });

    ioClient.on('off', (msg) => {
      console.info(msg);
      board.digitalWrite(13, board.LOW);
    });
  });
});