import AuthPage from './AuthPage'; // Update the import to use the correct path

export default AuthPage;

export const handleOtpLogin = async (phone, otp) => {
  const axios = require('axios').default;
  try {
    const response = await axios.post('/auth/login', { phone, otp });
    return response.data;
  } catch (error) {
    throw new Error('Failed to login with OTP');
  }
};

export const handleGuestLogin = async (deviceId) => {
  const axios = require('axios').default;
  try {
    const response = await axios.post('/auth/guest', { deviceId });
    return response.data;
  } catch (error) {
    throw new Error('Failed to login as guest');
  }
};
