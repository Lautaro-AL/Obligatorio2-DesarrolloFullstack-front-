import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { ArrowLeft, Music2, Loader2 } from "lucide-react";
import ListarCanciones from "./ListarCanciones";
import GraficaCategorias from "./GraficaCategorias";
import { useTranslation } from "react-i18next";

const DetallesPlaylist = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categorias, setCategorias] = useState([]);

  const buscarPlaylist = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `https://obligatorio1-desarrollo-fullstack-v.vercel.app/v1/playlist/detalles/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPlaylist(res.data);
    } catch (err) {
      console.error(err);
      setError("Error al cargar la playlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarPlaylist();
  }, [id]);

  useEffect(() => {
    if (!playlist || !playlist.canciones) return;
    const categorias = [];

    for (const c of playlist.canciones) {
      const nombreCat = c.categoria?.nombre;
      const existente = categorias.find((cat) => cat.nombre === nombreCat);

      if (existente) {
        existente.cantidad++;
      } else {
        categorias.push({ nombre: nombreCat, cantidad: 1 });
      }
    }
    setCategorias(categorias);
  }, [playlist]);

  if (loading) return <Loader2 className="icon-spin" size={90} />;
  if (error) return <p className="detalles-error">{error}</p>;
  if (!playlist)
    return <p className="detalles-error">No se encontró la playlist.</p>;

  return (
    <div className="detalles-page">
      <button className="btn-volver" onClick={() => navigate("/dashboard")}>
        <ArrowLeft size={18} /> {t("back")}
      </button>

      <div className="detalles-main">
        <div className="detalles-left">
          <h2>{t("generos")}</h2>
          <GraficaCategorias categorias={categorias} />
        </div>
        <div className="detalles-center">
          <div className="detalles-header">
            <img
              src={playlist.imagen}
              alt={playlist.nombre}
              className="detalles-imagen"
            />
            <div className="detalles-info">
              <h1>{playlist.nombre}</h1>
              <p className="descripcion">{playlist.descripcion}</p>
              <p className="creador">
                Creada por: <strong>{playlist.creadoPor?.username}</strong>
              </p>
            </div>
          </div>

          <div className="detalles-canciones">
            <h2>
              <Music2 size={20} /> Canciones
            </h2>
            {playlist.canciones && playlist.canciones.length > 0 ? (
              <ul className="cancion-lista-medio">
                {playlist.canciones.map((c) => (
                  <li key={c._id} className="cancion-item">
                    <div>
                      <strong>{c.titulo}</strong> — {c.artista}
                    </div>
                    <span className="cancion-categoria">
                      {c.categoria?.nombre || "Sin categoría"}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="sin-canciones">{t("playlistVacia")}</p>
            )}
          </div>
        </div>

        <div className="detalles-right">
          <h2>
            <Music2 size={20} /> {t("todasCanciones")}
          </h2>
          <div className="detalles-lista">
            <ListarCanciones playlistId={id} onAgregada={buscarPlaylist} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallesPlaylist;
