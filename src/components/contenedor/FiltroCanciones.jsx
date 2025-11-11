import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import "../../canciones.css";
import { useTranslation } from "react-i18next";

const FiltroCanciones = () => {
  const [canciones, setCanciones] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todas");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://obligatorio1-desarrollo-fullstack-v.vercel.app/v1/categorias",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCategorias(res.data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar las categorías.");
      }
    };

    obtenerCategorias();
  }, []);

  useEffect(() => {
    const obtenerCanciones = async () => {
      setLoading(true);
      console.log(categoriaSeleccionada);
      try {
        const token = localStorage.getItem("token");

        let url = "";
        if (categoriaSeleccionada === "todas") {
          url =
            "https://obligatorio1-desarrollo-fullstack-v.vercel.app/v1/song";
        } else {
          url = `https://obligatorio1-desarrollo-fullstack-v.vercel.app/v1/song/categoria/${categoriaSeleccionada}`;
        }
        console.log("URL solicitada:", url);
        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCanciones(res.data);
      } catch (err) {
        setError("Error al cargar las canciones.");
      } finally {
        setLoading(false);
      }
    };
    obtenerCanciones();
  }, [categoriaSeleccionada]);

  return (
    <div className="dashboard-canciones">
      <header className="dashboard-canciones-header">
        <h2 className="dashboard-canciones-titulo">
          {t("Canciones por Categoría")}
        </h2>

        <div className="dashboard-canciones-select">
          <select
            id="categoria"
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          >
            <option value="todas">Todas</option>
            {categorias.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>
      </header>

      <main className="dashboard-canciones-body">
        {loading ? (
          <div className="dashboard-canciones-loading">
            <Loader2 className="icon-spin" size={32} />
            <p>Cargando canciones...</p>
          </div>
        ) : error ? (
          <p className="dashboard-canciones-error">{error}</p>
        ) : canciones.length > 0 ? (
          <div className="dashboard-canciones-grid">
            {canciones.map((c) => (
              <div key={c._id} className="dashboard-canciones-card">
                <h3>{c.titulo}</h3>
                <p>
                  <strong>Artista:</strong> {c.artista}
                </p>
                <p>
                  <strong>Categoría:</strong> {c.categoria?.nombre}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="dashboard-canciones-vacio">
            No se encontraron canciones en esta categoría.
          </p>
        )}
      </main>
    </div>
  );
};

export default FiltroCanciones;
