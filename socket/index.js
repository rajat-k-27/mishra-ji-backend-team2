import { Server } from "socket.io";

const initSocket = (server) => {
    const io = new Server(server, {
        cors: { origin: "*" }
    });

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

    console.log("Socket.IO initialized");
};

export default initSocket;
