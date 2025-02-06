import React, { useState } from 'react';
import { Container, Box, Typography, CircularProgress, Grid, TextField, InputAdornment, Divider, Button } from '@mui/material';
import { useRouter } from 'next/router';
import SearchIcon from '@mui/icons-material/Search';
import StoreCard from '../components/StoreCard';
import useStores from '../hooks/useStores';
import faTexts from '../locales/fa.json';
import dynamic from 'next/dynamic';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import StoreDetails from '../components/StoreDetails';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

const StoreListPage = () => {
  const { stores, loading, error } = useStores();
  const router = useRouter();
  const [mapExpanded, setMapExpanded] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  const handleMapInteraction = () => {
    setMapExpanded(true);
  };

  const handleStoreClick = (store) => {
    setSelectedStore(store);
  };

  const handleBackToList = () => {
    setSelectedStore(null);
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
      <Box display="flex" alignItems="center" p={1.5} height={40}>
        <TextField
          placeholder="جستجو"
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <>
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
                <Divider orientation="vertical" flexItem />
                <Button variant="contained" style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none', color: 'black', padding: 10, margin: '5 0' }} endIcon={<FilterAltIcon style={{ color: 'black' }} />}>
                  <Box style={{ padding: '3px', margin: '0 8px' }}>
                    فیلترها
                  </Box>
                </Button>
              </>
            ),
          }}
        />
      </Box>
      <Box style={{ height: mapExpanded ? '85vh' : '30vh', transition: 'height 0.3s ease-in-out' }}>
        <Map stores={stores} onInteraction={handleMapInteraction} mapExpanded={mapExpanded} />
      </Box>
      <Box mt={0} style={{ transition: 'margin-top 0.3s ease-in-out' }}>
        {selectedStore ? (
          <StoreDetails store={selectedStore} onBack={handleBackToList} />
        ) : (
          <>
            <Typography variant="h4" gutterBottom>
              {faTexts.store_list}
            </Typography>
            <Grid container>
              {stores.map((store) => (
                <Grid item xs={12} sm={6} md={4} key={store.id}>
                  <StoreCard store={store} onClick={() => handleStoreClick(store)} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
    </Container>
  );
};

export default StoreListPage;
