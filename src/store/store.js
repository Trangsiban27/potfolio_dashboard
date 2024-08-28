import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import forgotResetPasswordReducer from "./slices/forgotResetPasswordSlice";
import projectReducer from "./slices/projectSlice";
import timelineReducer from "./slices/timelineSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    forgotPassword: forgotResetPasswordReducer,
    project: projectReducer,
    timeline: timelineReducer,
  },
});
