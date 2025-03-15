const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const trackingRoutes = require("./routes/trackingRoutes");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ✅ Use tracking routes correctly
app.use("/api/tracking", trackingRoutes);

// WebSocket connection for real-time tracking
io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);

  socket.on("send-location", (data) => {
    console.log("Received location:", data);
    io.emit("receive-location", { id: socket.id, ...data });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
    io.emit("disconnected", socket.id);
  });
});

app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
