import React from 'react';
import '../styles/fonts.css'; // Add this import
import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

console.log('NEXT_PUBLIC_API_BASE_URL:', process.env.NEXT_PUBLIC_API_BASE_URL);
console.log('NEXT_PUBLIC_MOCK_AXIOS:', process.env.NEXT_PUBLIC_MOCK_AXIOS);

if (process.env.NEXT_PUBLIC_MOCK_AXIOS === 'true') {
  import('../mock').then(() => {
    console.log('Mocking enabled');
  });
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
