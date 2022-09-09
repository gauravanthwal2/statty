import axios from "axios";
const apiUrl = "https://my-json-server.typicode.com/carefree-ladka/statty-data/users";


// Get All Participants
export const getAllUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}`);
      return response.data;
    } catch (err) {
      console.log(err.message);
    }
  };
  