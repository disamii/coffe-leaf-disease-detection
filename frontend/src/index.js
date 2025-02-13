import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import  store  from "./redux/store";

// Create a QueryClient instance
const queryClient = new QueryClient();

// Create a root for the React app
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the app using the new React 18 API
root.render(
  <React.StrictMode>
    {/* Wrap the entire app with QueryClientProvider */}
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
