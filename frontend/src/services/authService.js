import axios from 'axios';

export const sendOtp = async (phone) => {
  const response = await axios.post('/auth/otp', { phone });
  return response.data;
};

export const login = async (phone, otp) => {
  const response = await axios.post('/auth/login', { phone, otp });
  return response.data;
};

export const guestLogin = async (deviceId) => {
  const response = await axios.post('/auth/guest', { deviceId });
  return response.data;
};
