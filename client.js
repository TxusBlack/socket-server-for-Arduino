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
    let led = true;
    setInterval(() => {
      if (!led) {
        console.log('ON');
        board.digitalWrite(13, board.HIGH);
      } else {
        console.log('OFF');
        board.digitalWrite(13, board.LOW);
      }
      led = !led;
    }, 1000)
  });
});