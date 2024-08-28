import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    loading: false,
    error: null,
    message: null,
    isAuthenticated: false,
    timeline: {},
  },
  reducers: {
    getAllTimelineRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.isAuthenticated = true;
      state.timeline = [];
    },
    getAllTimelineSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.isAuthenticated = true;
      state.timeline = action.payload;
    },
    getAllTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
      state.isAuthenticated = false;
      state.timeline = [];
    },

    addTimelineRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.isAuthenticated = true;
      state.timeline = [];
    },
    addTimelineSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
      state.isAuthenticated = true;
      state.timeline = [];
    },
    addTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
      state.isAuthenticated = false;
      state.timeline = [];
    },

    clearAllErrors(state, action) {
      state.error = null;
    },
  },
});

export const getAllTimeline = () => async (dispatch) => {
  dispatch(timelineSlice.actions.getAllTimelineRequest());

  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/timeline/getAll",
      { withCredentials: true }
    );

    dispatch(timelineSlice.actions.getAllTimelineSuccess(data.timeline));
    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (e) {
    dispatch(
      timelineSlice.actions.getAllTimelineFailed(e.response.data.message)
    );
  }
};

export const addTimeline = (timelineData) => async (dispatch) => {
  dispatch(timelineSlice.actions.addTimelineRequest());

  try {
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/timeline/add",
      timelineData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(timelineSlice.actions.addTimelineSuccess(data.message));
    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (e) {
    dispatch(timelineSlice.actions.addTimelineFailed(e.response.data.message));
  }
};

export default timelineSlice.reducer;
