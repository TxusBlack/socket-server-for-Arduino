const io = require("socket.io-client"),
      ioClient = io.connect("134.209.70.254:80");

ioClient.on("seq-num", (msg) => {
  console.info(msg);
});