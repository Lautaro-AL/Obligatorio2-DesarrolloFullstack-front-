import { useState } from "react";
import axios from "axios";
import { playlistSchema } from "../../validators/auth.validators";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { Loader2, X } from "lucide-react";
import "../../dashboard.css";
import { toast } from "react-toastify";
import { t } from "i18next";
import { useSelector } from "react-redux";

const CrearPlaylist = ({ onCreated, onClose }) => {
  const [error, setError] = useState(null);
  const { token } = useSelector((state) => state.usuario);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(playlistSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);

    if (!data.imagen || data.imagen.trim() === "") {
      data.imagen =
        "https://res.cloudinary.com/dcj4d4puq/image/upload/v1762731361/v4mzetlhexztb0j3ocay.avif";
    }
    try {
      await axios.post(
        "https://obligatorio1-desarrollo-fullstack-v.vercel.app/v1/playlist",
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      reset();
      if (onCreated) {
        onCreated();
      }
      toast(t("playlistCreate"));
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error al crear la playlist");
      toast.error(t("errorPlaylist"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="crear-playlist-form" onSubmit={handleSubmit(onSubmit)}>
      {error && <p className="error">{error}</p>}
      {errors.descripcion && (
        <p className="error">{errors.descripcion.message}</p>
      )}{" "}
      {errors.imagen && <p className="error">{errors.imagen.message}</p>}
      {errors.nombre && <p className="error">{errors.nombre.message}</p>}
      <input
        type="text"
        placeholder="Nombre de la playlist"
        {...register("nombre")}
        className={errors.nombre ? "input-error" : ""}
      />
      <input
        type="text"
        placeholder="Descripción"
        {...register("descripcion")}
        className={errors.descripcion ? "input-error" : ""}
      />
      <input
        type="text"
        placeholder="Imagen URL"
        {...register("imagen")}
        className={errors.imagen ? "input-error" : ""}
      />
      <div className="crear-playlist-buttons">
        <button
          type="button"
          className="btn btn-create"
          onClick={onClose}
          disabled={loading}
        >
          <X size={11} />
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? <Loader2 className="icon-spin" size={18} /> : "Crear"}
        </button>
      </div>
    </form>
  );
};

export default CrearPlaylist;
