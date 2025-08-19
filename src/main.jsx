import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="89833805507-6to4t2vlc7okr4d98adisj9hrs8q61o3.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
 
