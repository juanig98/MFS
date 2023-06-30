import { useState } from "react";
import "./Login.scss";
import { AuthService } from "../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";
import { AppRoutesEnum } from "../AppRoutes";

const Login = () => {
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const authService = new AuthService();

  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault();
      const result = await authService.login({ username, password });
      if (result.authenticated) {
        navigate(AppRoutesEnum.DASHBOARD);
        return;
      } else if (result.error) {
        console.error(result.error);
      }
      setUsername("");
      setPassword("");
    } catch (err) {
      //   setErrorMessage(err.message.toString());
    }
  };

  return (
    <div id="login">
      <form onSubmit={handleSubmit}>
        <div>
          <h1>BackOffice</h1>
          <p>Acceso a usuarios</p>
        </div>
        <div>
          <input
            type="text"
            value={username}
            placeholder="Usuario"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            placeholder="Contraseña"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <button type="submit">Ingresar</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
