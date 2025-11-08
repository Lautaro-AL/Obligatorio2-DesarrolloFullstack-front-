import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Edit2, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import "../dashboard.css";
const Dashboard = () => {
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  const detallesPlaylist = (id) => {
    console.log("Ver detalles de playlist:", id);
    navigate(`/dashboard/playlist/${id}`);
  };
  const { t } = useTranslation();
  useEffect(() => {
    const listarPlaylists = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://obligatorio1-desarrollo-fullstack-v.vercel.app/v1/playlist",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPlaylists(res.data);
      } catch (err) {
        console.error("Error cargando playlists", err);
      }
    };

    listarPlaylists();
  }, []);

  return (
    //CAMBIAR LOS ONCLICK Y HACER PAG PARA LAS ACCIONES, BORRAR, MODIFICAR, VER DETALLES
    <div className="dashboard">
      <div className="dashboard-top">
        <h1 className="dashboard-title">{t("playlist")}</h1>
        <button
          className="btn btn-create"
          onClick={() => navigate("/crear-playlist")}
        >
          + Crear nueva playlist
        </button>
      </div>

      <section className="playlist-grid">
        {playlists.length > 0 ? (
          playlists.map((p) => (
            <article
              key={p._id}
              className="playlist-card"
              onClick={() => detallesPlaylist(p._id)}
            >
              <img
                src={
                  p.imagenUrl ||
                  "https://e.snmc.io/i/300/s/7e831d86dadb959c73940e14dec1d653/8952988"
                }
                alt={p.nombre}
                className="playlist-image"
              />

              <div className="playlist-info">
                <h3>{p.nombre}</h3>
                <p>{p.descripcion}</p>
                <span>{p.canciones.length} canciones</span>
              </div>

              <div
                className="playlist-actions"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="btn-icon edit"
                  onClick={() => editarPlaylist(p)}
                  title="Editar playlist"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  className="btn-icon delete"
                  onClick={() => eliminarPlaylist(p)}
                  title="Eliminar playlist"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </article>
          ))
        ) : (
          <p className="no-playlists">Todavía no tenés playlists creadas 🎧</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
