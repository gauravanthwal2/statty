import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import loginReducer from "./login/loginSlice";
import addParticipantReducer from "./addParticipants/addParticipantSlice";
import addTrainingsReducer from "./addTrainings/addTrainingSlice";

const commonReducer = () => {
  return {
    login: loginReducer,
    participants: addParticipantReducer,
    trainings: addTrainingsReducer,
  };
};

export const rootReducer = combineReducers(commonReducer());

// const masterReducer = (state, action) => {
//   // console.log("state", state);
//   // console.log("action", action);
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state,
//       participants: {
//         ...state.participants,
//         allParticipants:
//           action?.payload?.participants?.allParticipants?.length !==
//           state?.participants?.allParticipants?.length
//             ? [
//                 ...action?.payload?.participants?.allParticipants,
//                 ...state?.participants?.allParticipants,
//               ]
//             : [...state?.participants?.allParticipants],
//       },
//       trainings: {
//         ...state.trainings,
//         allTrainings:
//           action?.payload?.trainings?.allTrainings?.length !==
//           state?.trainings?.allTrainings?.length
//             ? [
//                 ...action?.payload?.trainings?.allTrainings,
//                 ...state?.trainings?.allTrainings,
//               ]
//             : [...state?.trainings?.allTrainings],
//       },
//     };
//     return nextState;
//   } else {
//     return rootReducer(state, action);
//   }
// };

export const makeStore = () =>
  configureStore({
    // reducer: masterReducer,
    reducer: rootReducer,
    devTools: true,
  });

export const wrapper = createWrapper(makeStore, { debug: true });
