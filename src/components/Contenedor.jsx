import { NavLink, Outlet, useNavigate } from "react-router";
import { desloguear } from "../features/usuario.slice";
import { useDispatch, useSelector } from "react-redux";

const Contenedor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, isLogged } = useSelector((state) => state.usuario);
  const cerrarSesion = () => {
    localStorage.removeItem("token"); // limpia token local
    dispatch(desloguear()); // resetea el slice
    navigate("/"); // redirige al login
  };
  const modificarUsuario = () => {
    navigate("/modificar-usuario");
  };
  return (
    <div className="layout">
      <header className="navbar">
        <p className="navbar-logo" to="/dashboard">
          🎧
        </p>

        <nav className="navbar-links">
          {isLogged && (
            <>
              <a onClick={modificarUsuario} className="user-button">
                {username}
              </a>
              <button onClick={cerrarSesion} className="logout-btn">
                Logout
              </button>
            </>
          )}
        </nav>
      </header>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Contenedor;
