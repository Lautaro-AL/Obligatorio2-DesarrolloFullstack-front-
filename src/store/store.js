import { configureStore } from "@reduxjs/toolkit";
import usuarioReducer from "../features/usuario.slice";

export const store = configureStore({
  reducer: {
    usuario: usuarioReducer,
  },
});
