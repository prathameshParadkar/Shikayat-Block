let clients = [];

function initSocket(wsServer) {
  // wsServer.on("request", (req) => {
  //   console.log("Request event");
  //   const query = req.resourceURL.query;

  // });

  wsServer.on("connection", (ws, req) => {
    // console.log("req", ws.url);
    // console.log(ws);
    // console.log(req);
    // ws://localhost:5000?user_id=${user_id}
    // const user_id = ws.upgradeReq.url.split("=")[1];
    // url parse
    const url = new URL(req.url, "http://localhost:5000");
    console.log(url);
    // const user_id = url.searchParams.get("user_id");
    const user_id = url.searchParams.get("user_id");
    // console.log(req);
    ws.user_id = user_id;
    console.log("User ID:", user_id);

    // clients.push(ws);
    console.log("Client connected");
    clients.forEach((client) => {
      client.send(
        JSON.stringify({ type: "message", data: "Hello from server" })
      );
    });

    ws.on("close", () => {
      clients = clients.filter((client) => client !== ws);
      console.log("Client disconnected");
    });
  });
}

function emitMessage(message) {
  console.log("Emitting message:", message);

  clients.forEach((client) => {
    console.log("Sending message to client");
    client.send(
      JSON.stringify({
        type: "message",
        data: message,
        user_id: client.user_id,
      })
    );
  });
}

module.exports = {
  initSocket,
  emitMessage,
};
