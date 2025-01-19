import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, Button, CircularProgress, Alert } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import faTexts from '../locales/fa.json';

const AuthPage = () => {
  const { phone, otp, isOtpSent, message, loading, setPhone, setOtp, handleSendOtp, handleLogin, handleGuestLogin } = useAuth();

  useEffect(() => {
    console.log('AuthPage rendered');
  }, []);

  return (
    <Container maxWidth="xs" style={{ fontFamily: 'IRANSansWeb', direction: 'rtl', textAlign: 'right' }}>
      <Box mt={5} display="flex" flexDirection="column" alignItems="center" textAlign="center">
        <Box mb={2} display="flex" justifyContent="center" width="100%">
          <img src="/logo.png" alt="Cafe Tala Logo" style={{ width: '150px', margin: '0 auto' }} />
        </Box>
        <Typography variant="h4" gutterBottom style={{ fontFamily: 'IRANSansWeb' }}>
          {faTexts.welcome_message}
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label={faTexts.phone_number}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          InputLabelProps={{ style: { fontFamily: 'IRANSansWeb', textAlign: 'right' } }} // Align label to the right
          inputProps={{ style: { fontFamily: 'IRANSansWeb', textAlign: 'left' } }} // Align text to the left
        />
        {isOtpSent && (
          <TextField
            fullWidth
            margin="normal"
            label={faTexts.otp}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            InputLabelProps={{ style: { fontFamily: 'IRANSansWeb', textAlign: 'right' } }} // Align label to the right
            inputProps={{ style: { fontFamily: 'IRANSansWeb', textAlign: 'left' } }} // Align text to the left
          />
        )}
        <Box mt={2} width="100%">
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={isOtpSent ? handleLogin : handleSendOtp}
            disabled={loading}
            style={{ fontFamily: 'IRANSansWeb' }}
          >
            {loading ? <CircularProgress size={24} /> : (isOtpSent ? faTexts.login : faTexts.send_otp)}
          </Button>
        </Box>
        <Box mt={2} width="100%">
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={handleGuestLogin}
            disabled={loading}
            style={{ fontFamily: 'IRANSansWeb' }}
          >
            {loading ? <CircularProgress size={24} /> : faTexts.guest_login}
          </Button>
        </Box>
        {message && (
          <Box mt={2} width="100%">
            <Alert severity={message.type} style={{ fontFamily: 'IRANSansWeb' }}>{message.text}</Alert>
          </Box>
        )}
        <Box mt={5} width="100%" textAlign="center">
          <Typography variant="body2" color="textSecondary" style={{ fontFamily: 'IRANSansWeb' }}>
            {faTexts.need_help}
          </Typography>
        </Box>
      </Box>
      <Box mt={5} textAlign="center">
        <Typography variant="body2" color="textSecondary" style={{ fontFamily: 'IRANSansWeb' }}>
          &copy; {new Date().getFullYear()} {faTexts.all_rights_reserved}
        </Typography>
      </Box>
    </Container>
  );
};

export default AuthPage;
