import { io, Socket } from "socket.io-client";

let socket: Socket;

export function getSocket() {
    if (!socket) {
        socket = io(`http://localhost:80`, {
            transports: ["websocket", "polling"],
            withCredentials: true,
            autoConnect: true,
            reconnection: true,
        });
        socket.on("connect", () => {
            console.log("socket connected:", socket.id);
        });
        socket.on("connect_error", (err) => {
            console.error("socket connect_error:", err.message);
        });
    }
    return socket;
}