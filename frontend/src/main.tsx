import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import './index.css'
import App from './App.tsx'
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store.ts";


const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Toaster position="top-center" />
          <App />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
