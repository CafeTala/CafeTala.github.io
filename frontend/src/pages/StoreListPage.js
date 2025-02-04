import React from 'react';
import { Container, Box, Typography, CircularProgress, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import StoreCard from '../components/StoreCard';
import useStores from '../hooks/useStores';
import faTexts from '../locales/fa.json';

const StoreListPage = () => {
  const { stores, loading, error } = useStores();
  const router = useRouter();

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
    <Container style={{ fontFamily: 'IRANSansWeb', direction: 'rtl', textAlign: 'right', padding: 0 }}>
      <Box mt={5}>
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
