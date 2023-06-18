import { useEffect, useState } from "react";

type WebSocketHook = {
  message: string;
  sendMessage: (event: string) => void;
};

const useWebSocket = (path?: string, host?: string): WebSocketHook => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState("");

  const defaultHost = import.meta.env.REACT_APP_WS_HOST || "localhost:3000";
  const url = `ws://${host || defaultHost}${path ? `/${path}` : ""}`;

  const connectWebSocket = () => {
    const newSocket = new WebSocket(url);

    newSocket.onopen = () => {
      console.log("WebSocket connection established.");
    };

    newSocket.onmessage = (event) => {
      const receivedMessage = event.data;
      console.log("Received message:", receivedMessage);
      setMessage(receivedMessage);
    };

    newSocket.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    setSocket(newSocket);
  };

  const disconnectWebSocket = () => {
    if (socket) {
      socket.close();
    }
  };

  const sendMessage = (event: string) => {
    if (socket) {
      const jsonMsg = JSON.stringify({ event });
      socket.send(jsonMsg);
    }
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      disconnectWebSocket();
    };
  }, [url]);

  return { message, sendMessage };
};

export default useWebSocket;
