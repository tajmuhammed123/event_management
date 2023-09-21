import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from "@material-tailwind/react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider>
        <GoogleOAuthProvider clientId="396923851681-hl0f4ckgnho40cgh46bl06emt5fhvbjd.apps.googleusercontent.com">
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
        </GoogleOAuthProvider>
      </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
