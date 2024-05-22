import { GoogleOAuthProvider } from "@react-oauth/google";
import Route from "./routes";
import { ChatAuthProvider } from "./context";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ChatAuthProvider>
        <Route />
      </ChatAuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
