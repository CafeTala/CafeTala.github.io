import { useState } from 'react';
import { sendOtp, login, guestLogin } from '../services/authService';
import faTexts from '../locales/fa.json';

export const useAuth = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    console.log('Sending OTP...');
    setLoading(true);
    try {
      const response = await sendOtp(phone);
      setMessage({ type: 'success', text: response.message });
      setIsOtpSent(true);
    } catch (error) {
      setMessage({ type: 'error', text: faTexts.otp_sent_fail });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    console.log('Logging in...');
    setLoading(true);
    try {
      const response = await login(phone, otp);
      setMessage({ type: 'success', text: faTexts.login_success });
      // Handle successful login (e.g., store token, redirect)
    } catch (error) {
      setMessage({ type: 'error', text: faTexts.login_fail });
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    console.log('Guest login...');
    setLoading(true);
    try {
      const response = await guestLogin('guest-device-id');
      setMessage({ type: 'success', text: faTexts.guest_login_success });
      // Handle successful guest login (e.g., store token, redirect)
    } catch (error) {
      setMessage({ type: 'error', text: faTexts.guest_login_fail });
    } finally {
      setLoading(false);
    }
  };

  return {
    phone,
    otp,
    isOtpSent,
    message,
    loading,
    setPhone,
    setOtp,
    handleSendOtp,
    handleLogin,
    handleGuestLogin,
  };
};
