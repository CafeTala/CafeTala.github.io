import axios from 'axios';

export const fetchStores = async () => {
  const response = await axios.get('/api/stores');
  return response.data;
};
