import { useState } from "react";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";

const schema = Joi.object({
  image: Joi.any()
    .required()
    .custom((value, helpers) => {
      if (!value || value.length === 0) {
        return helpers.error("any.required");
      }
      const file = value[0];
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        return helpers.error("any.invalid");
      }
      if (file.size > 2 * 1024 * 1024) {
        return helpers.error("any.max");
      }
      return value;
    })
    .messages({
      "any.required": "La imagen es obligatoria",
      "any.invalid": "Solo se permiten JPG, PNG o WEBP",
      "any.max": "La imagen no puede superar los 2MB",
    }),
});

const Upload = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: joiResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setUrl("");

    const file = data.image[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "presetObligatorioDFS");
    formData.append("cloud_name", "dcj4d4puq");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dcj4d4puq/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const uploaded = await res.json();
      setUrl(uploaded.secure_url);
      reset();
    } catch (err) {
      console.error("Error al subir imagen:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Subir imagen a Cloudinary</h2>

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="image">Seleccioná una imagen</label>
          <input type="file" id="image" {...register("image")} />

          {errors.image && <p className="error">{errors.image.message}</p>}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Subiendo..." : "Subir"}
          </button>
        </form>

        {url && (
          <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
            <h4>Imagen subida:</h4>
            <img
              src={url.replace(
                "/upload/",
                "/upload/c_scale,w_300/f_auto/q_auto/"
              )}
              alt="upload"
              width="300"
              style={{
                borderRadius: "10px",
                marginTop: "0.5rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
              }}
            />
            <p style={{ marginTop: "0.5rem" }}>
              URL original:{" "}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                Ver imagen completa
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
