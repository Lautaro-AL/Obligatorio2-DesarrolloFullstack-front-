import { NavLink, Outlet } from "react-router";

const Contenedor = () => {
  return (
    <div>
      <header>
        <p>Mi aplicacion</p>
        <nav>
          <NavLink to="/">Login</NavLink>
          <NavLink to="/registro">Registro</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Contenedor;
