import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllParticipants,
  addParticipant,
  updateParticipant,
} from "../../services/participantServices";

import { HYDRATE } from "next-redux-wrapper";

// Get All Participant Data
export const getAllParticipantsData = createAsyncThunk(
  "participant/getAllParticipantsData",
  () => getAllParticipants()
);

// Add New Participant
export const addNewParticipant = createAsyncThunk(
  "participant/addNewParticipant",
  (data) => addParticipant(data)
);

// Update Participant
export const updateParticipantsData = createAsyncThunk(
  "participant/updateParticipantsData",
  ({ id, data }) => updateParticipant(id, data)
);

const initialState = {
  selectedParticipant: {},
  allParticipants: [],
  hasErrors: "",
  loading: false,
};

const addParticipantSlice = createSlice({
  name: "participants",
  initialState,
  reducers: {
    setSelectedParticipant: (state, { payload }) => {
      state.selectedParticipant = state.allParticipants.filter(
        (user) => user.OracleId === payload.OracleId
      )[0];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, { payload }) => {
        if (payload.participants.allParticipants.length !== state.allParticipants) {
          state.allParticipants = payload.participants.allParticipants;
        }else{
          return state;
        }
      })
      // Get All Participants
      .addCase(getAllParticipantsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllParticipantsData.fulfilled, (state, { payload }) => {
        state.allParticipants = payload;
        state.loading = false;
      })
      .addCase(getAllParticipantsData.rejected, (state, action) => {
        state.loading = false;
        state.hasErrors = action.error.message;
      })
      // Add New Participant
      .addCase(addNewParticipant.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewParticipant.fulfilled, (state, { payload }) => {
        state.allParticipants = [...state.allParticipants, payload];
        state.loading = false;
      })
      .addCase(addNewParticipant.rejected, (state, action) => {
        state.loading = false;
        state.hasErrors = action.error.message;
      })
      // Update Participant
      .addCase(updateParticipantsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateParticipantsData.fulfilled, (state, { payload }) => {
        const oldState = state.allParticipants.filter(
          (item) => item.OracleId !== payload.OracleId
        );
        state.allParticipants = [...oldState, payload];
        state.loading = false;
      })
      .addCase(updateParticipantsData.rejected, (state, action) => {
        state.loading = false;
        state.hasErrors = action.error.message;
      });
  },
});

export const { setSelectedParticipant } = addParticipantSlice.actions;
export default addParticipantSlice.reducer;
