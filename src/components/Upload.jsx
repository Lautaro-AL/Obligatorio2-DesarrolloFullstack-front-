import { useState } from "react";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import "../upload.css";

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

const Upload = ({ onUploadComplete }) => {
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
    formData.append("upload_preset", "presetObligatorioDFS"); // preset unsigned
    formData.append("cloud_name", "dcj4d4puq"); // cloud name

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

      if (onUploadComplete) onUploadComplete(uploaded.secure_url);

      localStorage.setItem("lastUploadedImage", uploaded.secure_url);
    } catch (err) {
      console.error("Error al subir imagen:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="upload-container">
      <div className="upload-box">
        <input type="file" {...register("image")} />
        {errors.image && <p className="error">{errors.image.message}</p>}

        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
          className="btn btn-primary"
        >
          {loading ? "Subiendo..." : "Subir"}
        </button>
      </div>

      {url && (
        <div className="preview">
          <h4>Imagen subida:</h4>
          <img
            src={url.replace(
              "/upload/",
              "/upload/c_scale,w_300/f_auto/q_auto/"
            )}
            alt="upload"
            width="300"
          />
        </div>
      )}
    </div>
  );
};

export default Upload;
