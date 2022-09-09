import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useEffect } from "react";
import {
  getAllTrainings,
  getTrainingById,
  updateTraining,
  addTraining,
} from "../../services/trainingServices";
import { HYDRATE } from "next-redux-wrapper";

// Get All Training Data
export const getAllTrainingsData = createAsyncThunk(
  "training/getAllTrainingsData",
  () => getAllTrainings()
);

// Add New Participant
export const addNewTraining = createAsyncThunk(
  "trainings/addNewTraining",
  (data) => addTraining(data)
);

// Update Participant
export const updateTrainingData = createAsyncThunk(
  "trainings/updateTrainingData",
  ({ id, data }) => updateTraining(id, data)
);

const initialState = {
  selectedTraining: {},
  allTrainings: [],
  hasErrors: false,
  loading: false,
};

export const addTrainingSlice = createSlice({
  name: "trainings",
  initialState,
  reducers: {
    setSelectedTraining: (state, { payload }) => {
      console.log("payload", payload);
      state.selectedTraining = state.allTrainings.filter(
        (user) => user.trainingCode === payload.trainingCode
      )[0];
    }
  },

  extraReducers: (builder) => {
    builder
    .addCase(HYDRATE, (state, { payload }) => {
      if(payload.trainings.allTrainings.length !== state.allTrainings.length){
        state.allTrainings = payload.trainings.allTrainings;
      }else{
        return state;
      }
    })
      .addCase(getAllTrainingsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTrainingsData.fulfilled, (state, { payload }) => {
        state.allTrainings = payload;
        state.loading = false;
      })
      .addCase(getAllTrainingsData.rejected, (state, action) => {
        state.loading = false;
        state.hasErrors = true;
      })
      // Add New Participant
      .addCase(addNewTraining.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewTraining.fulfilled, (state, { payload }) => {
        state.allTrainings = [...state.allTrainings, payload];
        state.loading = false;
      })
      .addCase(addNewTraining.rejected, (state, action) => {
        state.loading = false;
        state.hasErrors = action.error.message;
      })
      // Update Participant
      .addCase(updateTrainingData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTrainingData.fulfilled, (state, { payload }) => {
        const oldState = state.allTrainings.filter(
          (item) => item.trainingCode !== payload.trainingCode
        );
        state.allTrainings = [...oldState, payload];
        state.loading = false;
      })
      .addCase(updateTrainingData.rejected, (state, action) => {
        state.loading = false;
        state.hasErrors = action.error?.message;
      })
      
  },
});

export const { setSelectedTraining } = addTrainingSlice.actions;
export default addTrainingSlice.reducer;
