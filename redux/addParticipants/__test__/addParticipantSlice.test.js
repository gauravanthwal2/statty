import participantReducer,{getAllParticipantsData, setSelectedParticipant}
 from "../addParticipantSlice";
import {mockData, mockUser} from './mockdata';


describe("Participants Reducer", ()=>{
    test("should return the initial state when passed an empty action", ()=>{
        const initialState = undefined;
        const action = {type: ""};
        const result = participantReducer(initialState, action);
        expect(result).toEqual({
            selectedParticipant: {},
            allParticipants: [],
            hasErrors: "",
            loading: false,
        })
    })

    test("should return the selected participant state", ()=>{
        const prevState = {
            allParticipants: mockData,
            selectedParticipant: {}
        };
        const action = setSelectedParticipant(mockUser);
        const result = participantReducer(prevState, action);
        expect(result.selectedParticipant).toEqual(mockUser);
    })
})

//createAsyncThunk test cases...

describe("Participant Slice Test", () => {
    test("should set loading true while action is pending", () => {
      const action = { type: getAllParticipantsData.pending }; 
      const initialState = participantReducer(
        {
          hasErrors: "",
          loading: true,
        },
        action
      );
      expect(initialState).toEqual({ hasErrors: "", loading: true });
    });

    test("should set the state when action is fulfilled", () => {
        const action = { type: getAllParticipantsData.fulfilled, payload: { mockData } };
    
        const state = {
          selectedParticipant: {},
          allParticipants: [],
          hasErrors: "",
          loading: false,
        };
    
        const expectedState = {
          allParticipants: {mockData} ,
          hasErrors: "",
          loading: false,
          selectedParticipant: {},
        };
    
        const initialState = participantReducer(state, action);
        expect(initialState).toEqual(expectedState);
      });
  });