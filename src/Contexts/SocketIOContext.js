import React, { createContext, useContext, useState } from "react";

const SocketIOContenxt = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState();

  const connectSocket = (newSocket) => {
    setSocket(newSocket);
  };

  const value = { socket, connectSocket };

  return (
    <SocketIOContenxt.Provider value={value}>
      {children}
    </SocketIOContenxt.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketIOContenxt);
};
