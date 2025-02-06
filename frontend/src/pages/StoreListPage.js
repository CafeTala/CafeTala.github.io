import React, { useState } from 'react';
import { Container, Box, Typography, CircularProgress, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import StoreCard from '../components/StoreCard';
import useStores from '../hooks/useStores';
import faTexts from '../locales/fa.json';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

const StoreListPage = () => {
  const { stores, loading, error } = useStores();
  const router = useRouter();
  const [mapExpanded, setMapExpanded] = useState(false);

  const handleMapInteraction = () => {
    setMapExpanded(true);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">
          {faTexts.error_loading_stores}
        </Typography>
      </Box>
    );
  }

  return (
    <Container style={{ fontFamily: 'IRANSansWeb', direction: 'rtl', textAlign: 'right', padding: 0, height: '100vh', overflow: 'auto' }}>
      <Box style={{ height: mapExpanded ? '70vh' : '30vh', transition: 'height 0.3s ease-in-out' }}>
        <Map stores={stores} onInteraction={handleMapInteraction} />
      </Box>
      <Box mt={5} style={{ marginTop: mapExpanded ? '40vh' : '5vh', transition: 'margin-top 0.3s ease-in-out' }}>
        <Typography variant="h4" gutterBottom>
          {faTexts.store_list}
        </Typography>
        <Grid container>
          {stores.map((store) => (
            <Grid item xs={12} sm={6} md={4} key={store.id}>
              <StoreCard store={store} onClick={() => router.push(`/stores/${store.id}`)} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default StoreListPage;
