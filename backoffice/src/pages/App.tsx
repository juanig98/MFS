import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import { useAuth } from "../hooks/useAuth";
import AppRoutes from "./AppRoutes";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <BrowserRouter>
        <AppRoutes isAuthenticated={isAuthenticated} />
      </BrowserRouter>
    </>
  );
}

export default App;
