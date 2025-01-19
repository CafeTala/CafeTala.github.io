const authService = require('../services/authService');

exports.login = async (req, res) => {
  const { phone, otp } = req.body;
  try {
    const user = await authService.verifyOtp(phone, otp);
    const token = authService.generateToken(user.id);
    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.sendOtp = async (req, res) => {
  const { phone } = req.body;
  try {
    await authService.sendOtp(phone);
    res.json({ message: 'OTP sent successfully.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getTokenForGuest = async (req, res) => {
  const { deviceId } = req.body;
  try {
    const token = authService.generateGuestToken(deviceId);
    res.json({ token, guest: { id: deviceId } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
