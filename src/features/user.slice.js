import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: !!localStorage.getItem("token"), // !! convierte a booleano
  token: localStorage.getItem("token") || null,
};

const usuarioSlice = createSlice({
  name: "usuario",
  initialState,
  reducers: {
    loguear: (state) => {
      state.isLogged = true;
      state.token = localStorage.getItem("token");
    },
    desloguear: (state) => {
      state.isLogged = false;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { loguear, desloguear } = usuarioSlice.actions;
export default usuarioSlice.reducer;
