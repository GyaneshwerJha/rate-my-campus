import axios from 'axios';
import dotenv from 'dotenv';

// dotenv.config();
// const API_ENDPOINT = import.meta.env.VITE_API_URL;
const API_ENDPOINT = import.meta.env.VITE_API_URL;
// Get campuses
const getCampuses = async () => {
  const response = await axios.get(`${API_ENDPOINT}/api/campuses`);
  return response.data;
};

// Create new campus
const createCampus = async (campusData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await axios.post(
    `${API_ENDPOINT}/api/campuses`,
    campusData,
    config
  );
  return response.data;
};

const campusesService = {
  getCampuses,
  createCampus,
};

export default campusesService;
