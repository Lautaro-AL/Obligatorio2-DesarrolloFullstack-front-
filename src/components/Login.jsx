import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { loguear } from "../features/usuario.slice";
import { Loader2 } from "lucide-react";
import "../auth.css";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Login = () => {
  const campoUsuario = useRef(null);
  const campoPassword = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setErorr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [camposInvalidos, setCamposInvalidos] = useState(true);
  const { t } = useTranslation();

  const verificarCampos = () => {
    setCamposInvalidos(
      campoPassword.current.value === "" || campoUsuario.current.value === ""
    );
  };

  const ingresar = async (e) => {
    e.preventDefault();
    setLoading(true);
    const username = campoUsuario.current.value;
    const password = campoPassword.current.value;
    try {
      const response = await axios.post(
        "https://obligatorio1-desarrollo-fullstack-v.vercel.app/v1/auth/login",
        {
          username,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", username);

      dispatch(loguear());
      navigate("/dashboard");
      toast(t("loginExitoso"));
    } catch (err) {
      toast("Error al iniciar sesión. Verifica tus credenciales.");
      setErorr(err.response?.data?.message || "Credenciales inválidas");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="containerAuth">
        <div className="card " id="clogin">
          <h2>{t("login")}</h2>
          <form className="form" onSubmit={ingresar}>
            <label htmlFor="username">{t("username")}</label>
            <input
              type="text"
              id="username"
              name="username"
              ref={campoUsuario}
              onChange={verificarCampos}
              placeholder={t("username")}
              required
            />

            <label htmlFor="password">{t("password")}</label>
            <input
              type="password"
              id="password"
              name="password"
              ref={campoPassword}
              onChange={verificarCampos}
              placeholder="********"
              required
            />
            {error && <p className="error">{error}</p>}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || camposInvalidos}
            >
              {loading ? (
                <>
                  <Loader2 className="icon-spin" size={18} />
                </>
              ) : (
                "Login"
              )}
            </button>

            <p className="text-small">
              {t("noTenesCuenta")}{" "}
              <Link to="/registro" id="link">
                {t("register")}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
