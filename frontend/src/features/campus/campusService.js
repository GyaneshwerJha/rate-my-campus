import axios from 'axios';

// const API_ENDPOINT = import.meta.env.VITE_API_URL;
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
// Get single campus
const getCampus = async (id) => {
  const response = await axios.get(`${API_ENDPOINT}/api/campuses/${id}`);
  return response.data;
};

// Create new review
const createReview = async (reviewData, campus, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${API_ENDPOINT}/api/campuses/${campus}/reviews`,
    reviewData,
    config
  );
  return response.data;
};

const campusService = {
  getCampus,
  createReview,
};

export default campusService;
