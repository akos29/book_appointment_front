// import axios from 'axios';

// const BASE_URL = `${process.env.REACT_APP_API_ENDPOINT}`; // Replace with your API URL

// const prepareHeaders = (token) => {
//   const headers = {
//     'Content-Type': 'application/json',
//   };

//   if (token) {
//     headers.Authorization = `Bearer ${token}`;
//   }

//   return headers;
// };

// const apiGet = async (endpoint, token) => {
//   try {
//     const response = await axios.get(`${BASE_URL}${endpoint}`, {
//       headers: prepareHeaders(token),
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export default apiGet;
