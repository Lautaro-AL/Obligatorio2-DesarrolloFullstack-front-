import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  const detallesPlaylist = (id) => {
    navigate(`/dashboard/playlist/${id}`);
  };

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
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Tus Playlists</h1>
        <button className="btn btn-primary">+ Crear nueva playlist</button>
      </header>

      <section className="playlist-grid">
        {playlists.map((p) => (
          <div key={p._id} className="playlist-card">
            <h3>{p.nombre}</h3>
            <p>{p.descripcion}</p>
            <p>{p.canciones.length} canciones</p>
            <div className="playlist-actions">
              <button className="btn btn-secondary">Ver detalles</button>
              <button className="btn btn-danger">Eliminar</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Dashboard;
