import { Link } from "react-router";

const Registro = () => {
  return (
    <div className="container">
      <div className="card">
        <h2>Crear cuenta</h2>
        <form className="form">
          <label htmlFor="username">Nombre de usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Tu usuario"
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="********"
            required
          />

          <label htmlFor="confirmPassword">Repetir contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="********"
            required
          />

          <button type="submit" className="btn btn-primary">
            Registrarse
          </button>

          <p className="text-small">
            ¿Ya tenés cuenta?
            <Link to="/">Iniciar sesión</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registro;
