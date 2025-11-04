import "./App.css";
import Contenedor from "./components/Contenedor";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import NoEncontrado from "./components/NoEncontrado";
import Registro from "./components/Registro";
import { BrowserRouter, Routes, Route } from "react-router";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Contenedor />}>
          <Route path="/" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NoEncontrado />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
