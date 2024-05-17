import { GoogleOAuthProvider } from "@react-oauth/google";
import Route from "./Route";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Route />
    </GoogleOAuthProvider>
  );
}

export default App;
