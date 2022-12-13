import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import PinProvider from "./context/pin";
import PlaceProvider from "./context/place";
import UserProvider from "./context/user";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PinProvider>
     <UserProvider>
    <PlaceProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PlaceProvider>
  </UserProvider>
  </PinProvider>
 
);
