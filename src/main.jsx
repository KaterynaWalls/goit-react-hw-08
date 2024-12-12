import {createRoot} from "react-dom/client";
import React from "react";
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store.js";
import 'modern-normalize/modern-normalize.css';

import App from "./components/App.jsx";
import './index.css';
import { CssBaseline } from '@mui/material';


createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <BrowserRouter>
        <HelmetProvider>
        <CssBaseline />
            <App />
            <Toaster
        position='top-right'
        reverseOrder={false}
        toastOptions={{
          duration: 2000,
          style: {
            background: '#333',
            color: '#fff',
            fontSize: '16px',
          },
        }}
      />
        </HelmetProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
