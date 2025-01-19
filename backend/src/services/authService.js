const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const redisAdapter = require('../utils/redisAdapter');

// ...existing code...

exports.generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.verifyOtp = async (phone, otp) => {
  const storedOtp = await redisAdapter.get(phone);
  if (storedOtp === otp) {
    await redisAdapter.del(phone); // Remove OTP after verification
    return { id: 'mock-user-id', phone };
  } else {
    throw new Error('Invalid OTP');
  }
};

exports.sendOtp = async (phone) => {
  // Generate a random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await redisAdapter.setex(phone, 300, otp); // Save OTP with a TTL of 300 seconds (5 minutes)
  console.log(`Sending OTP ${otp} to phone: ${phone}`);
  return true;
};

exports.generateGuestToken = (deviceId) => {
  return jwt.sign({ id: deviceId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
