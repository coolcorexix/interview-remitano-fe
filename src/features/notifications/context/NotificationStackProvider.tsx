import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import useWebSocket from "src/services/useWebSocket.tsx";

type NotificationStackProviderProps = {
  children: ReactNode;
};

type NotificationContextType = {
  messages: string[];
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

const useNotificationContext = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationContext must be used within a NotificationStackProvider"
    );
  }
  return context;
};

function NotificationStackProvider({
  children,
}: NotificationStackProviderProps) {
  const [messages, setMessages] = useState<string[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const { message } = useWebSocket();

  useEffect(() => {
    setMessages((prevMessages) => [...prevMessages, message]);
    enqueueSnackbar(message);
  }, [message]);

  return (
    <SnackbarProvider maxSnack={5}>
      <NotificationContext.Provider value={{ messages }}>
        {children}
      </NotificationContext.Provider>
    </SnackbarProvider>
  );
}

export { NotificationStackProvider, useNotificationContext };
