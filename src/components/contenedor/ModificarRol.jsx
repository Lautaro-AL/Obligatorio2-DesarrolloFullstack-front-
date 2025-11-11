import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

const ModificarRol = () => {
  const { username } = useParams();
  const { token } = useSelector((state) => state.usuario);
  const [loading, setLoading] = useState(false);
  const [planes, setPlanes] = useState([]);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const res = await axios.get(
          `https://obligatorio1-desarrollo-fullstack-v.vercel.app/v1/user/${username}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUsuario(res.data);
      } catch (err) {
        toast.error("Error al obtener el usuario");
      }
    };

    const obtenerPlanes = async () => {
      try {
        const res = await axios.get(
          "https://obligatorio1-desarrollo-fullstack-v.vercel.app/v1/user/planes",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPlanes(res.data);
      } catch (err) {
        toast.error("Error al obtener los planes");
      }
    };

    obtenerUsuario();
    obtenerPlanes();
  }, [username, token]);

  const cambiarAPlanPlus = async () => {
    const planPlus = planes.find((p) => p.nombre === "plus");

    if (!planPlus) {
      toast.error("No se encontró el plan plus");
      return;
    }

    if (usuario.plan?.nombre === "plus") {
      toast.info("Ya tenés el plan plus");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.patch(
        `https://obligatorio1-desarrollo-fullstack-v.vercel.app/v1/user/${username}/${planPlus._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsuario(res.data.usuarioModificado);
      toast.success("Plan actualizado a plus con éxito");
    } catch (error) {
      toast.error("Error al cambiar de plan");
    } finally {
      setLoading(false);
    }
  };

  const cambiarAPlanPremium = async () => {
    const planPremium = planes.find((p) => p.nombre === "premium");

    if (!planPremium) {
      toast.error("No se encontró el plan Premium");
      return;
    }

    if (usuario.plan?.nombre === "premium") {
      toast.info("Ya tenés el plan Premium");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.patch(
        `https://obligatorio1-desarrollo-fullstack-v.vercel.app/v1/user/${username}/${planPremium._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsuario(res.data.usuarioModificado);
      toast.success("Plan actualizado a Premium con éxito");
    } catch (error) {
      toast.error("Error al cambiar de plan");
    } finally {
      setLoading(false);
    }
  };

  if (!usuario) return <Loader2 className="icon-spin" size={90} />;

  return (
    <div className="cambiar-plan-container">
      <h2>Mi plan actual: {usuario.plan.nombre}</h2>
      <div>
        <button
          onClick={cambiarAPlanPremium}
          disabled={loading}
          className="btn btn-primary btn-cambio"
        >
          {"Cambiar a Premium"}
        </button>

        <button
          onClick={cambiarAPlanPlus}
          disabled={loading}
          className="btn btn-primary"
        >
          {"Cambiar a plus"}
        </button>
      </div>
    </div>
  );
};

export default ModificarRol;
