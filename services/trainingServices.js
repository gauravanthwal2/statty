import axios from "axios";
const apiUrl = "https://my-json-server.typicode.com/carefree-ladka/statty-data/trainings";

// Get All Trainings
export const getAllTrainings = async () => {
  try {
    const response = await axios.get(`${apiUrl}`);
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Get Trainings Details by Id
export const getTrainingById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Create a New Trainings
export const addTraining = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}`, data);
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Delete Trainings by Id
export const deleteTraining = async (id) => {
  try {
    const res = await getTrainingById(id);
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

// Update Trainings by Id
export const updateTraining = async (id, data) => {
  try {
    const res = await getTrainingById(id);
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
