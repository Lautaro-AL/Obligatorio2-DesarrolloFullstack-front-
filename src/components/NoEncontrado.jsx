import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

const NoEncontrado = () => {
  const navigate = useNavigate();
  const { isLogged } = useSelector((state) => state.usuario);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLogged) {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    }, 3500);
    return () => clearTimeout(timer);
  }, [navigate, isLogged]);

  return (
    <div className="notfound-container">
      <div className="notfound-card">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-text">Página no encontrada</p>
        <div className="loading">
          <Loader2 className="icon-spin" size={26} />
          <span>Redirigiendo al inicio...</span>
        </div>
      </div>
    </div>
  );
};

export default NoEncontrado;
