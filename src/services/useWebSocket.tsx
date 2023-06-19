import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useSharedVideo } from "src/features/videos";

interface WebSocketHook {
  message: string;
  sendMessage: (event: string, data?: any) => void;
}

const useWebSocket = (path?: string, host?: string): WebSocketHook => {
  const { clearSharedVideos } = useSharedVideo()
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState("");

  const defaultHost = import.meta.env.REACT_APP_WS_HOST || "localhost:3000";
  const url = `http://${defaultHost || host}${path ? `/${path}` : ""}`;

  const sendMessage = (event: string, data?: any) => {
    if (socket) {
      socket.emit(event, data);
    }
  };

  useEffect(() => {
    const newSocket = io(url);

    newSocket.on("connect", () => {
      console.log("WebSocket connection established.");
    });

    newSocket.on("message", (data: any) => {
      const receivedMessage = data.message;
      console.log("Received message:", receivedMessage);
      setMessage(receivedMessage);
    });

    newSocket.on('video_shared', (data: any) => {
      setMessage(`New video shared from ${data.sharedBy}!`);
      clearSharedVideos();
    });

    newSocket.on("disconnect", () => {
      console.log("WebSocket connection closed.");
    });

    setSocket(newSocket);

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [url]);

  return { message, sendMessage };
};

export default useWebSocket;
