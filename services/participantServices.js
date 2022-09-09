import axios from "axios";
const apiUrl = "https://my-json-server.typicode.com/carefree-ladka/statty-data/participants";

// Get All Participants
export const getAllParticipants = async () => {
  try {
    const response = await axios.get(`${apiUrl}`);
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Get Participant Details by Id
export const getParticipantById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Create a New Participant
export const addParticipant = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}`, data);
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Delete Participant by Id
export const deleteParticipant = async (id) => {
  try {
    const res = await getParticipantById(id);
    if (res) {
      const response = await axios.delete(`${apiUrl}/${id}`);
      return response.data;
    } else {
      return { msg: "Id is invalid", success: false };
    }
  } catch (err) {
    console.log(err.message);
  }
};

// Update Participant by Id
export const updateParticipant = async (id, data) => {
  try {
    const res = await getParticipantById(id);
    if (res) {
      const response = await axios.put(`${apiUrl}/${id}`, data);
      return response.data;
    } else {
      return { msg: "Id is invalid", success: false };
    }
  } catch (err) {
    console.log(err.message); 
  }
};
