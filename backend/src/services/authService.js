const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, OTP } = require('../models');

// ...existing code...

exports.generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.generateGuestToken = (deviceId) => {
  return jwt.sign({ id: deviceId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.verifyOtp = async (phone, otp) => {
  const storedOtp = await OTP.findOne({ where: { phone, otp } });
  if (storedOtp && storedOtp.expiresAt > new Date()) {
    await OTP.destroy({ where: { phone, otp } }); // Remove OTP after verification
    let user = await User.findOne({ where: { phone } });
    if (!user) {
      user = await User.create({ phone, isGuest: true });
    }
    return user;
  } else {
    throw new Error('Invalid OTP');
  }
};

exports.sendOtp = async (phone) => {
  // Generate a random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
  await OTP.create({ phone, otp, expiresAt });
  console.log(`Sending OTP ${otp} to phone: ${phone}`);
  return true;
};
