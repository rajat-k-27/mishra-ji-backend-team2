import { Server } from "socket.io";

const initSocket = (server) => {
    const io = new Server(server, {
        cors: { origin: "*" }
    });

    io.on("connection", (socket) => {
        console.log("A delivery agent connected:", socket.id);
        
        // Send 'hello' with the socket ID to the client
        socket.emit("hello", { message: "Hello from server", socketId: socket.id });

        socket.on("update-location", (data) => {
            io.emit(`order-track-${data.orderId}`, data.location);
        });

        socket.on("disconnect", () => {
            console.log("Delivery agent disconnected:", socket.id);
        });
    });

    console.log("Socket.IO initialized");
};

export default initSocket;
