import { Link } from "react-router";
const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <p>
        No tenes una cuenta? <Link to="/registro">Registrate</Link>
      </p>
    </div>
  );
};

export default Login;
