import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActionArea, Box } from '@mui/material';
import faTexts from '../locales/fa.json';

const StoreCard = ({ store, onClick }) => {
  return (
    <Card onClick={onClick} style={{ fontFamily: 'IRANSansWeb', height: '100px', display: 'flex', flexDirection: 'row' }}>
      <CardActionArea style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <CardMedia
          component="img"
          alt={store.name}
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          image={store.image || '/images/shop.png'}
          title={store.name}
        />
        <CardContent style={{ flex: '1', textAlign: 'right' }}>
          <Typography gutterBottom variant="h6" component="div">
            {store.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {faTexts.store_type}: {store.type}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default StoreCard;
