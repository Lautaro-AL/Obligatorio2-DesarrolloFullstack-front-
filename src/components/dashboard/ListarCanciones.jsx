import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Loader2 } from "lucide-react";

const ListarCanciones = ({ playlistId, onAgregada }) => {
  const [canciones, setCanciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [agregando, setAgregando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerCanciones = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://obligatorio1-desarrollo-fullstack-v.vercel.app/v1/song",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCanciones(res.data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar las canciones." || err.response?.data?.error);
      } finally {
        setLoading(false);
      }
    };

    obtenerCanciones();
  }, []);

  const agregarCancion = async (cancionId) => {
    setAgregando(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://obligatorio1-desarrollo-fullstack-v.vercel.app/v1/playlist/add-song",
        { playlistId, cancionId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onAgregada?.();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Error al agregar la canción.");
    } finally {
      setAgregando(false);
    }
  };

  if (loading)
    return (
      <div className="listar-canciones">
        <Loader2 className="icon-spin" size={40} />
      </div>
    );

  if (error) return <p className="error">{error}</p>;

  return (
    <div className="listar-canciones">
      <ul className="cancion-lista">
        {canciones.map((c) => (
          <li key={c._id} className="cancion-item">
            <div>
              <strong>{c.titulo}</strong> — {c.artista}
            </div>
            <button
              className="btn-agregar"
              onClick={() => agregarCancion(c._id)}
              disabled={agregando}
            >
              <Plus size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListarCanciones;
