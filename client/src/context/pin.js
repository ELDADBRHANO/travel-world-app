import { createContext, useState } from "react";

export const pinContext = createContext();

function PinProvider({ children }) {
  const [pin, setPin] = useState([]);

  return (
    <pinContext.Provider value={{ pin, setPin}}>
      {children}
    </pinContext.Provider>
  );
}

export default PinProvider;
