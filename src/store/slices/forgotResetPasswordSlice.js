import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const forgotResetPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    forgotPasswordRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    forgotPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    resetPasswordRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    resetPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    clearAllErrors(state, action) {
      state.error = null;
      state = state;
    },
  },
});

export const forgotPasswordChange = (email) => async (dispatch) => {
  dispatch(forgotResetPasswordSlice.actions.forgotPasswordRequest());
  try {
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/user/password/forgot",
      { email },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );

    dispatch(
      forgotResetPasswordSlice.actions.forgotPasswordSuccess(data.message)
    );
    dispatch(forgotResetPasswordSlice.actions.clearForgotPasswordErrors());
  } catch (e) {
    dispatch(
      forgotResetPasswordSlice.actions.forgotPasswordFailed(
        e.response.data.message
      )
    );
  }
};

export const resetPassword =
  (token, password, confirmPassword) => async (dispatch) => {
    dispatch(forgotResetPasswordSlice.actions.resetPasswordRequest());

    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/user/password/reset/${token}`,
        { password, confirmPassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      dispatch(
        forgotResetPasswordSlice.actions.resetPasswordSuccess(data.message)
      );
      dispatch(forgotResetPasswordSlice.actions.clearAllErrors());
    } catch (e) {
      dispatch(
        forgotResetPasswordSlice.actions.clearAllErrors(e.response.data.message)
      );
    }
  };

export const clearForgotPasswordErrors = () => (dispatch) => {
  dispatch(forgotResetPasswordSlice.actions.clearAllErrors());
};

export default forgotResetPasswordSlice.reducer;
