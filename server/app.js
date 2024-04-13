const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const { Server: WebSocketServer } = require("ws");
const app = express();
const server = require("http").createServer(app);
const wsServer = new WebSocketServer({ server });
const auth = require("./middlewares/auth");
// const {}

// io.clients
const { initSocket } = require("./util");

initSocket(wsServer);

require("./db/Conn");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the directory where you want to save the files
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    // Generate unique file name
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Initialize multer middleware
const upload = multer({ storage: storage });
exports.upload = upload;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const baseR = express.Router();
app.use(
  "/api",
  (req, res, next) => {
    // Allow requests from any origin
    // console.log("test set in req", req.body);

    res.header("Access-Control-Allow-Origin", "*");
    // Allow the following HTTP methods
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    // Allow these headers to be sent
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  },
  baseR
);

baseR.use("/explore", require("./Router/Block"));
app.use("/auth", require("./Router/Auth"));
baseR.use("/market", require("./Router/Market"));
baseR.use("/complaint", auth, require("./Router/Complaint"));
baseR.use("/webhook", require("./Router/Webhook"));

// app.use("/fixed_label", (req, res, next) => {
//   // Allow requests from any origin
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   // Allow the following HTTP methods
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   // Allow these headers to be sent
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// }, require("./Router/Test"));

// app.use((req, res, next) => {
//   // Allow requests from any origin

//   res.header('Access-Control-Allow-Origin', '*');
//   // Allow the following HTTP methods
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   // Allow these headers to be sent
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

const PORT = 5000;
// const io = socketIo(server);
// const connections = [];

// io.on("connection", (socket) => {
//   connections.push(socket);
//   console.log("connections", connections.length);

//   console.log("A client connected");

//   // Simulating data emitting every second
//   // setInterval(() => {
//   //   const data = Math.random() * 100; // Generate random data
//   //   socket.send("data", data);
//   // }, 1000);

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

// app.listen(PORT, () => {
//   // console.clear()
//   console.log(`Server@http://localhost:${PORT}`);
// });

server.listen(5000, () => {
  // console.log("Server started on port 5000");
  console.log(`Server@http://localhost:${PORT}`);
});

// exports.io = io;
// exports.connections = connections;

// const clients = [];
// wsServer.on("connection", (ws) => {
//   // ws.send("Welcome to the websocket server");
//   setInterval(() => {
//     ws.send(JSON.stringify({ type: "message", data: "Hello from server" }));
//   }, 1000);
//   clients.push(ws);
//   console.log("Client connected");
//   clients.forEach((client) => {
//     client.send(JSON.stringify({ type: "message", data: "Hello from server" }));
//   });

//   ws.on("close", () => {
//     clients = clients.filter((client) => client !== ws);
//     console.log("Client disconnected");
//   });
// });
