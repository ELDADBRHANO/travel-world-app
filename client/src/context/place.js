import { createContext, useState } from "react";

export const placeContext = createContext();

function PlaceProvider({ children }) {
  const [newPlace, setNewPlace] = useState(null);

  return (
    <placeContext.Provider value={{ newPlace, setNewPlace}}>
      {children}
    </placeContext.Provider>
  );
}

export default PlaceProvider;
