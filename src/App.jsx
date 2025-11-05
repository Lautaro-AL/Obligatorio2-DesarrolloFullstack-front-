import "./App.css";
import Contenedor from "./components/Contenedor";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import NoEncontrado from "./components/NoEncontrado";
import Registro from "./components/Registro";
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles.css";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Contenedor />}>
            <Route path="/" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            {/* <Route path="/dashboard" element={<ProtectedRoute />}> */}
            <Route path="/dashboard" element={<Dashboard />} />
            {/* </Route> */}
            <Route path="*" element={<NoEncontrado />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
