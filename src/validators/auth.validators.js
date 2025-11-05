import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.base": "El username ser un texto",
    "string.alphanum": "El username solo puede contener letras y números",
    "string.empty": "El username no puede estar vacío",
    "string.min": "El username debe tener al menos {#limit} caracteres",
    "any.required": "El username es obligatorio",
  }),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .messages({
      "string.base": "La contraseña debe ser un texto",
      "string.empty": "La contraseña no puede estar vacía",
      "string.min": "La contraseña debe tener al menos {#limit} caracteres",
      "any.required": "La contraseña es obligatoria",
      "string.pattern.base":
        "La contraseña solo puede contener letras y números",
    }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.only": "Las contraseñas no coinciden",
    "any.required": "La confirmación de contraseña es obligatoria",
  }),
  plan: Joi.string(),
});

export const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.base": "El username ser un texto",
    "string.empty": "El username no puede estar vacío",
    "string.min": "El username debe tener al menos {#limit} caracteres",
    "any.required": "El username es obligatorio",
  }),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .messages({
      "string.base": "La contraseña debe ser un texto",
      "string.empty": "La contraseña no puede estar vacía",
      "string.min": "La contraseña debe tener al menos {#limit} caracteres",
      "any.required": "La contraseña es obligatoria",
      "string.pattern.base":
        "La contraseña solo puede contener letras y números",
    }),
});

export const playlistSchema = Joi.object({
  nombre: Joi.string().min(1).max(100).required().messages({
    "string.empty": "El nombre de la playlist es obligatorio",
    "string.min": "El nombre debe tener al menos 1 carácter",
    "string.max": "El nombre no puede superar 100 caracteres",
    "any.required": "El nombre es requerido",
  }),
  descripcion: Joi.string().allow("").max(500).messages({
    "string.max": "La descripción no puede superar 500 caracteres",
  }),
});
