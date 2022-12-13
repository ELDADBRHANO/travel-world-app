import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PlaceProvider from './context/place';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PlaceProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </PlaceProvider>
);


