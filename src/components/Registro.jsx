import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { loguear } from "../features/usuario.slice";
import { Loader2 } from "lucide-react";
import { registerSchema } from "../validators/auth.validators";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useTranslation } from "react-i18next";

const Registro = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passInvalido, setPassInvalido] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(registerSchema),
  });

  useEffect(() => {
    setPassInvalido(password !== confirmPass);
  }, [password, confirmPass]);

  const onSubmit = async (data) => {
    setError(null);
    setLoading(true);
    const { username, password, confirmPassword } = data;
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        "https://obligatorio1-desarrollo-fullstack-v.vercel.app/v1/auth/register",
        { username, password, confirmPassword }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", username);
      dispatch(loguear({ username, token: response.data.token }));
      navigate("/dashboard");
    } catch (err) {
      const apiError =
        err.response?.data?.error || "Error inesperado en el registro";
      setError(apiError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="containerAuth">
      <div className="card">
        <h2>{t("createAccount")}</h2>

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="username">{t("username")}</label>
          <input
            id="username"
            placeholder={t("username")}
            {...register("username")}
          />
          {errors.username && (
            <p className="error">{errors.username.message}</p>
          )}
          <label htmlFor="password">{t("password")}</label>
          <input
            type="password"
            id="password"
            placeholder="********"
            {...register("password")}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
          <label htmlFor="confirmPassword">{t("rePass")}</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="********"
            {...register("confirmPassword")}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword.message}</p>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={(loading, passInvalido)}
          >
            {loading ? (
              <Loader2 className="icon-spin" size={18} />
            ) : (
              "Registrarse"
            )}
          </button>

          {error && <p className="error">{error}</p>}

          <p className="text-small">
            ¿Ya tenés cuenta?{" "}
            <Link to="/" id="link">
              Iniciar sesión
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registro;
