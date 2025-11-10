import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { ArrowLeft, Music2, BarChart3, Loader2 } from "lucide-react";
import ListarCanciones from "./ListarCanciones";
const DetallesPlaylist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  if (loading) return <Loader2 className="icon-spin" size={90} />;
  if (error) return <p className="detalles-error">{error}</p>;
  if (!playlist)
    return <p className="detalles-error">No se encontró la playlist.</p>;

  return (
    <div className="detalles-page">
      <button className="btn-volver" onClick={() => navigate("/dashboard")}>
        <ArrowLeft size={18} /> Volver
      </button>

      <div className="detalles-main">
        {/* Columna izquierda: gráfica */}
        <div className="detalles-left">
          <div className="detalles-graph">
            <BarChart3 size={26} />
            <p>Gráfica próximamente...</p>
          </div>
        </div>

        {/* Columna central: info de la playlist */}
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

          {/* Lista de canciones de la playlist */}
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
              <p className="sin-canciones">
                Esta playlist aún no tiene canciones.
              </p>
            )}
          </div>
        </div>

        {/* Columna derecha: Lista de canciones externas */}
        <div className="detalles-right">
          <h2>
            <Music2 size={20} /> Todas las canciones
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
