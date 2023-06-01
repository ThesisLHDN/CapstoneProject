import React, {useState} from 'react';

export const SocketContext = React.createContext();

function SocketProvider({children}) {
  const [socket, setSocket] = useState(null);

  return (
    <SocketContext.Provider
      value={{
        socket,
        setSocket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
