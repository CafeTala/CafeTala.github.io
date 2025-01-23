import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActionArea } from '@mui/material';
import faTexts from '../locales/fa.json';

const StoreCard = ({ store, onClick }) => {
  return (
    <Card onClick={onClick} style={{ fontFamily: 'IRANSansWeb' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={store.name}
          height="140"
          image={store.image || '/default-store.jpg'}
          title={store.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
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
