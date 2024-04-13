import { createSlice } from "@reduxjs/toolkit";

export const ActionTypes = {
  AUTH: "AUTH",
  LOGOUT: "LOGOUT",
};

export const UserRole = {
  SUPERADMIN: "SUPERADMIN",
  ADMIN: "ADMIN",
  USER: "USER",
};

const authSlice = createSlice({
  name: "auth",
  initialState: { authData: {} },
  reducers: {
    auth: (state, action) => {
      switch (action.payload.type) {
        case ActionTypes.AUTH:
          localStorage.setItem(
            "profile",
            JSON.stringify({ ...action?.payload.result })
          );
          console.log("authData", action?.payload.result);
          state = { ...state, authData: action?.payload.result };
          console.log("state", state);
          break;
        case ActionTypes.LOGOUT:
          localStorage.clear();
          state = { ...state, authData: {} };
          break;
        default:
          state = state;
          break;
      }
      console.log("state", state);
    },
  },
});

export const auth = authSlice.actions.auth;
export const authReducer = authSlice.reducer;
