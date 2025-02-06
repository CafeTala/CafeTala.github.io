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

const separatorSvg = "data:image/svg+xml;charset=utf-8,<svg width='120' height='16' viewBox='0 0 120 16' xmlns='http://www.w3.org/2000/svg'><rect x='0' y='0' width='120' height='16' stroke='%23DDD' stroke-width='1' fill='none'/><line x1='10' y1='8' x2='110' y2='8' stroke='%23555' stroke-width='1.5' stroke-linecap='round'/><g transform='translate(60,8)'><path d='M-5 -2 L0 -6 L5 -2 Z' fill='%23555'/><path d='M-5 2 L0 6 L5 2 Z' fill='%23555'/></g></svg>";

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
    <Container style={{ fontFamily: 'IRANSansWeb', direction: 'rtl', textAlign: 'right', padding: 0, height: '100vh', overflow: 'hidden' }}>
      <Box style={{ height: '100%', overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style jsx>{`
          ::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <Box display="flex" alignItems="center" p={1.5} height={40} style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1000 }}>
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
        <Box display="flex" justifyContent="center" my={2}>
          <img src={separatorSvg} alt="separator" />
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
      </Box>
    </Container>
  );
};

export default StoreListPage;
