import React from 'react';
import '../styles/fonts.css'; // Add this import

console.log('NEXT_PUBLIC_MOCK_AXIOS:', process.env.NEXT_PUBLIC_MOCK_AXIOS);

if (process.env.NEXT_PUBLIC_MOCK_AXIOS === 'true') {
  import('../setupProxy').then(() => {
    console.log('Mocking enabled');
  });
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
