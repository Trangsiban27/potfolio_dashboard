import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    loading: false,
    project: [],
    error: null,
    message: null,
    isUpdated: false,
  },
  reducers: {
    getAllProjectRequest(state, action) {
      state.loading = true;
      state.project = [];
      state.error = null;
      state.message = null;
    },
    getAllProjectSuccess(state, action) {
      state.loading = false;
      state.project = action.payload;
      state.error = null;
    },
    getAllProjectFailed(state, action) {
      state.loading = false;
      state.project = [];
      state.error = action.payload;
      state.message = null;
    },

    addProjectRequest(state, action) {
      state.loading = true;
      state.project = [];
      state.error = null;
      state.message = null;
    },
    addProjectSuccess(state, action) {
      state.loading = false;
      state.project = [];
      state.error = null;
      state.message = action.payload;
    },
    addProjectFailed(state, action) {
      state.loading = false;
      state.project = [];
      state.error = action.payload;
      state.message = null;
    },

    getProjectRequest(state, action) {
      state.loading = true;
      state.project = [];
      state.error = null;
      state.message = null;
    },
    getProjectSuccess(state, action) {
      state.loading = false;
      state.project = action.payload;
      state.error = null;
    },
    getProjectFailed(state, action) {
      state.loading = false;
      state.project = [];
      state.error = action.payload;
      state.message = null;
    },

    updateProjectRequest(state, action) {
      state.loading = true;
      state.project = [];
      state.error = null;
      state.message = null;
    },
    updateProjectSuccess(state, action) {
      state.loading = false;
      state.project = [];
      state.error = null;
      state.message = action.payload;
    },
    updateProjectFailed(state, action) {
      state.loading = false;
      state.project = [];
      state.error = action.payload;
      state.message = null;
    },

    deleteProjectRequest(state, action) {
      state.loading = true;
      state.project = [];
      state.error = null;
      state.message = null;
    },
    deleteProjectSuccess(state, action) {
      state.loading = false;
      state.project = [];
      state.error = null;
      state.message = action.payload;
    },
    deleteProjectFailed(state, action) {
      state.loading = false;
      state.project = [];
      state.error = action.payload;
      state.message = null;
    },

    clearAllErrors(state, action) {
      state.error = null;
    },
  },
});

export const getAllProject = () => async (dispatch) => {
  dispatch(projectSlice.actions.getAllProjectRequest());

  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/project/getAll",
      { withCredentials: true }
    );

    dispatch(projectSlice.actions.getAllProjectSuccess(data.project));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (e) {
    dispatch(projectSlice.actions.getAllProjectFailed(e.response.data.message));
  }
};

export const addProject = (projectData) => async (dispatch) => {
  dispatch(projectSlice.actions.addProjectRequest());

  try {
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/project/add",
      projectData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    dispatch(projectSlice.actions.addProjectSuccess(data.message));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (e) {
    dispatch(projectSlice.actions.addProjectFailed(e.response.data.message));
  }
};

export const getProject = (projectId) => async (dispatch) => {
  dispatch(projectSlice.actions.getProjectRequest());

  try {
    const { data } = await axios.get(
      `http://localhost:4000/api/v1/project/getProject/${projectId}`,
      { withCredentials: true }
    );

    dispatch(projectSlice.actions.getProjectSuccess(data.project));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (e) {
    dispatch(projectSlice.actions.getProjectFailed(e.response.data.message));
  }
};

export const updateProject = (projectId, projectData) => async (dispatch) => {
  dispatch(projectSlice.actions.updateProjectRequest());

  try {
    const { data } = await axios.put(
      `http://localhost:4000/api/v1/project/update/${projectId}`,
      projectData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    dispatch(projectSlice.actions.addProjectSuccess(data.project));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (e) {
    dispatch(projectSlice.actions.updateProjectFailed(e.response.data.message));
  }
};

export const deleteProject = (projectId) => async (dispatch) => {
  dispatch(projectSlice.actions.deleteProjectRequest());

  try {
    const { data } = await axios.delete(
      `http://localhost:4000/api/v1/project/delete/${projectId}`,
      { withCredentials: true }
    );

    dispatch(projectSlice.actions.deleteProjectSuccess(data.message));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (e) {
    dispatch(deleteProjectFailed(e.response.data.message));
  }
};

export default projectSlice.reducer;
