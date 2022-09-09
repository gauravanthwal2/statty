import { createSlice, createAction } from "@reduxjs/toolkit";
import trainingReducer, {
  setSelectedTraining,
  getAllTrainingsData,
} from "../addTrainingSlice";
import { data, mockuser } from "./mockData";

describe("training reducer", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should handle initialState", () => {
    const initialState = {
      selectedTraining: {},
      allTrainings: [],
      hasErrors: "",
      loading: false,
    };
    const expectedState = initialState;
    expect(trainingReducer(initialState, { type: "unknown" })).toEqual(
      expectedState
    );
  });

  test("should handle set training", () => {
    const state = {
      selectedTraining: {},
      allTrainings: data,
      hasErrors: "",
      loading: false,
    };

    const action = setSelectedTraining(mockuser);
    const result = trainingReducer(state, action);
    expect(result.selectedTraining).toEqual(mockuser);
  });
});

//getAllTrainingsData createAsyncThunk
describe("Training Slice Test", () => {
  test("should set loading true while action is pending", () => {
    const action = { type: getAllTrainingsData.pending };
    const initialState = trainingReducer(
      {
        hasErrors: false,
        loading: true,
      },
      action
    );
    expect(initialState).toEqual({ hasErrors: false, loading: true });
  });

  test("should set the state when action is fulfilled", () => {
    const action = { type: getAllTrainingsData.fulfilled, payload: data };

    const state = {
      allTrainings: [],
      hasErrors: false,
      loading: false,
      selectedTraining: {},
    };

    const expectedState = {
      allTrainings: data,
      hasErrors: false,
      loading: false,
      selectedTraining: {},
    };

    const initialState = trainingReducer(state, action);
    expect(initialState).toEqual(expectedState);
  });

  test("should set hasError true when action is rejected", () => {
    const action = { type: getAllTrainingsData.rejected };

    const state = {
      allTrainings: [],
      hasErrors: false,
      loading: false,
      selectedTraining: {},
    };

    const expectedState = {
      allTrainings: [],
      hasErrors: true,
      loading: false,
      selectedTraining: {},
    };
    const initialState = trainingReducer(state, action);
    console.log("initialState", initialState);
    expect(initialState).toEqual(expectedState);
  });
});

//Testing Slices...
