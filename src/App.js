import React from "react";
import Header from "./component/Header/Header";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId="202764783206-qvsejn8n96u29dl97tjrkmaae33l4djd.apps.googleusercontent.com">
      <div>
        <Header />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
