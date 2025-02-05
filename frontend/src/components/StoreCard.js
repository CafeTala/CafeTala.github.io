import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActionArea, Box, Divider } from '@mui/material';
import faTexts from '../locales/fa.json';

const currencyIcons = {
  IRR: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#4CAF50" />
      <text x="12" y="16" textAnchor="middle" fill="white" fontSize="12" fontFamily="Arial">T</text>
    </svg>
  ),
  USD: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#2196F3" />
      <text x="12" y="16" textAnchor="middle" fill="white" fontSize="12" fontFamily="Arial">$</text>
    </svg>
  ),
  GOLD: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#FFD700" />
      <text x="12" y="16" textAnchor="middle" fill="white" fontSize="12" fontFamily="Arial">G</text>
    </svg>
  )
};

const StoreCard = ({ store, onClick }) => {
  const storeTypeText = store.type === 'physical' ? `فیزیکی - ${store.location.neighborhood}` : `مجازی - ${store.contact.website}`;
  const openStatus = store.openHours && store.openHours[store.currentDay] ? `باز تا ${store.openHours[store.currentDay]}` : 'تعطیل';

  return (
    <Box onClick={onClick} style={{ fontFamily: 'IRANSansWeb', cursor: 'pointer' }}>
      <Card style={{ display: 'flex', flexDirection: 'row-reverse', boxShadow: 'none' }}>
        <CardActionArea style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}>
          <CardMedia
            component="img"
            alt={store.name}
            style={{ width: '150px', height: '150px', objectFit: 'cover', backgroundColor: store.image ? 'transparent' : '#f0f0f0', margin: '10px' }}
            image={store.image || '/images/shop.png'}
            title={store.name}
          />
          <CardContent style={{ flex: '1', textAlign: 'right' }}>
            <Typography gutterBottom variant="h6" component="div" style={{ fontWeight: 'bold' }}>
              {store.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {storeTypeText}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {store.supportedCurrencies.map(currency => currencyIcons[currency] || currency).reduce((prev, curr) => [prev, ' ', curr])}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {openStatus}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Divider />
    </Box>
  );
};

export default StoreCard;
