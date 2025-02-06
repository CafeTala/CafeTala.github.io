import React from 'react';
import { Box, Typography, Button, Divider, Paper } from '@mui/material';
import faTexts from '../locales/fa.json';

const StoreDetails = ({ store, onBack }) => {
  return (
    <Paper elevation={3} style={{ fontFamily: 'IRANSansWeb', direction: 'rtl', textAlign: 'right', padding: 16, margin: 16 }}>
      <Button onClick={onBack} variant="contained" color="primary" style={{ marginBottom: 16 }}>
        {faTexts.back_to_list}
      </Button>
      <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', color: '#3f51b5' }}>
        {store.name}
      </Typography>
      <Typography variant="body1" gutterBottom style={{ marginBottom: 8 }}>
        {store.type === 'physical' ? `فیزیکی - ${store.location.neighborhood}` : `مجازی - ${store.contact.website}`}
      </Typography>
      <Typography variant="body1" gutterBottom style={{ marginBottom: 8 }}>
        {faTexts.supported_currencies}: {store.supportedCurrencies.join(', ')}
      </Typography>
      <Typography variant="body1" gutterBottom style={{ marginBottom: 8 }}>
        {faTexts.contact}: {store.contact.phone}
      </Typography>
      <Typography variant="body1" gutterBottom style={{ marginBottom: 8 }}>
        {faTexts.email}: {store.contact.email}
      </Typography>
      <Typography variant="body1" gutterBottom style={{ marginBottom: 8 }}>
        {faTexts.social_links}: 
        <a href={`https://facebook.com/${store.contact.socialLinks.facebook}`} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 8 }}>Facebook</a>, 
        <a href={`https://instagram.com/${store.contact.socialLinks.instagram}`} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 8 }}>Instagram</a>, 
        <a href={`https://twitter.com/${store.contact.socialLinks.twitter}`} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 8 }}>Twitter</a>
      </Typography>
      <Typography variant="body1" gutterBottom style={{ marginBottom: 8 }}>
        {faTexts.open_hours}: 
        {Object.entries(store.openHours).map(([day, hours]) => (
          <div key={day} style={{ marginLeft: 16 }}>{faTexts[day]}: {hours}</div>
        ))}
      </Typography>
      <Divider style={{ margin: '16px 0' }} />
      <Typography variant="body2" color="textSecondary">
        {faTexts.address}: {store.location.address}
      </Typography>
    </Paper>
  );
};

export default StoreDetails;
