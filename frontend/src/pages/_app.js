import React from 'react';
import '../styles/fonts.css'; // Add this import
import axios from 'axios';

if (process.env.NEXT_PUBLIC_MOCK_AXIOS === 'true') {
  console.log('MOCK_AXIOS:', process.env.NEXT_PUBLIC_MOCK_AXIOS);
  import('../__mock__/mock').then(() => {
    console.log('Mocking enabled');
  });
}
else {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  console.log('API_BASE_URL:', process.env.NEXT_PUBLIC_API_BASE_URL);
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
