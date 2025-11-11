import "./App.css";
import Contenedor from "./components/Contenedor";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import NoEncontrado from "./components/NoEncontrado";
import Registro from "./components/Registro";
import CrearPlaylist from "./components/dashboard/CrearPlaylist";
import Upload from "./components/Upload";
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ProtectedRoute from "./components/ProtectedRoute";
import ModificarPlaylist from "./components/dashboard/ModificarPlaylist";
import DetallesPlaylist from "./components/dashboard/DetallesPlaylist";
import ModificarRol from "./components/profile/ModificarRol";
import "./styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Contenedor />}>
            <Route path="/" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/dashboard" element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="crear-playlist" element={<CrearPlaylist />} />
              <Route
                path="modificar-playlist/:id"
                element={<ModificarPlaylist />}
              />
              <Route
                path="detalles-playlist/:id"
                element={<DetallesPlaylist />}
              />
              <Route
                path="modificar-usuario/:username"
                element={<ModificarRol />}
              />
            </Route>
            <Route path="*" element={<NoEncontrado />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-left"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        theme="dark"
      />
    </Provider>
  );
};

export default App;
