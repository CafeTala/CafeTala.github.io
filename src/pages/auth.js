import AuthPage from './AuthPage';
import axios from 'axios';

export default AuthPage;

export const handleOtpLogin = async (phone, otp) => {
  try {
    const response = await axios.post('/auth/login', { phone, otp });
    return response.data;
  } catch (error) {
    throw new Error('Failed to login with OTP');
  }
};

export const handleGuestLogin = async (deviceId) => {
  try {
    const response = await axios.post('/auth/guest', { deviceId });
    return response.data;
  } catch (error) {
    throw new Error('Failed to login as guest');
  }
};
