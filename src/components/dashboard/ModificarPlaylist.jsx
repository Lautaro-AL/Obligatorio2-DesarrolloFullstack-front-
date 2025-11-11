import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import Upload from "../Upload";
import { Loader2, ArrowLeft } from "lucide-react";
import { playlistSchema } from "../../validators/auth.validators";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "react-toastify";

const ModificarPlaylist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(playlistSchema),
  });

  // Cargar datos de la playlist
  useEffect(() => {
    const traerPlaylist = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `https://obligatorio1-desarrollo-fullstack-v.vercel.app/v1/playlist/detalles/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = res.data;
        setValue("nombre", data.nombre);
        setValue("descripcion", data.descripcion);
        setValue("imagen", data.imagen);
        setPreview(data.imagen || "");
      } catch (err) {
        console.error(err);
        setError("Error al cargar la playlist");
      } finally {
        setLoading(false);
      }
    };

    traerPlaylist();
  }, [id, setValue]);

  // Cuando se sube una imagen, actualiza form e imagen de preview
  const handleImageUpload = (url) => {
    setValue("imagen", url);
    setPreview(url);
    console.log("Imagen subida, URL:", url);
  };

  const onSubmit = async (data) => {
    console.log("Datos enviados al backend:", data);

    setSaving(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `https://obligatorio1-desarrollo-fullstack-v.vercel.app/v1/playlist/${id}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/dashboard/detalles-playlist/${id}`);
      toast("🎧 Modificada!");
    } catch (err) {
      console.error(err);
      setError("Error al guardar los cambios");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="modificar-loading">Cargando...</p>;
  if (error && !saving) return <p className="modificar-error">{error}</p>;

  return (
    <div className="modificar-container">
      <button className="btn-volver" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} /> Volver
      </button>

      <h1>Modificar Playlist</h1>

      <form className="modificar-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="modificar-columna">
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            {...register("nombre")}
            placeholder="Nombre de la playlist"
          />
          {errors.nombre && <p className="error">{errors.nombre.message}</p>}

          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            rows={3}
            {...register("descripcion")}
            placeholder="Descripción opcional"
          />
          {errors.descripcion && (
            <p className="error">{errors.descripcion.message}</p>
          )}
        </div>

        <div className="modificar-imagen">
          <label>Imagen de la playlist</label>
          <Upload onUploadComplete={handleImageUpload} />

          {errors.imagen && <p className="error">{errors.imagen.message}</p>}
        </div>

        <div className="modificar-buttons">
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate(-1)}
            disabled={saving}
          >
            Cancelar
          </button>
          <button type="submit" className="btn-save" disabled={saving}>
            {saving ? (
              <Loader2 className="icon-spin" size={18} />
            ) : (
              "Guardar cambios"
            )}
          </button>
        </div>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default ModificarPlaylist;
