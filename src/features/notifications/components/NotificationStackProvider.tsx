import { SnackbarProvider, useSnackbar } from "notistack";
import useWebSocket from "src/services/useWebSocket.tsx";
import { ReactNode, useEffect, useRef } from "react";

const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    if (delay !== null) {
      const intervalId = setInterval(tick, delay);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [delay]);
};

type NotificationStackProviderProps = {
  children: ReactNode;
};

export default function NotificationStackProvider({
  children,
}: NotificationStackProviderProps) {
  const { enqueueSnackbar } = useSnackbar();
  const { message, sendMessage } = useWebSocket();
  useInterval(() => {
    sendMessage("ping");
  }, 1000);

  useEffect(() => {
    enqueueSnackbar(message);
  }, [message]);

  return <SnackbarProvider maxSnack={5}>{children}</SnackbarProvider>;
}
