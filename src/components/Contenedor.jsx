import { NavLink, Outlet, useNavigate } from "react-router";
import { desloguear } from "../features/usuario.slice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const Contenedor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, isLogged } = useSelector((state) => state.usuario);
  const { t, i18n } = useTranslation();

  const logo = () => {
    navigate("/dashboard");
  };
  const cerrarSesion = () => {
    localStorage.removeItem("token"); // limpia token local
    dispatch(desloguear()); // resetea el slice
    navigate("/"); // redirige al login
  };
  const cambiarIdioma = () => {
    let nuevoIdioma;
    if (i18n.language === "es") {
      nuevoIdioma = "en";
    } else {
      nuevoIdioma = "es";
    }
    i18n.changeLanguage(nuevoIdioma);
    toast(t("language"));
  };

  const modificarUsuario = () => {
    navigate(`dashboard/modificar-usuario/${username}`);
  };
  return (
    <div className="layout">
      <header className="navbar">
        <a className="navbar-logo" onClick={logo}>
          🎧
        </a>

        <nav className="navbar-links">
          {isLogged && (
            <>
              <a onClick={modificarUsuario} className="user-button">
                {username}
              </a>
              <button onClick={cerrarSesion} className="logout-btn">
                {t("Logout")}
              </button>
            </>
          )}
        </nav>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <button className="btn-idioma" onClick={cambiarIdioma} title="idiomas">
        🌐
      </button>
    </div>
  );
};

export default Contenedor;
