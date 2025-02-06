import React from 'react';
import { Box, Typography, Button, Divider, Paper, IconButton, Tooltip } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
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
        {faTexts.supported_currencies}: {store.supportedCurrencies.map(currency => currencyIcons[currency] || currency).reduce((prev, curr) => [prev, ' ', curr])}
      </Typography>
      <Box display="flex" alignItems="center" style={{ marginBottom: 8 }}>
        <PhoneIcon style={{ marginLeft: 8 }} />
        <a href={`tel:${store.contact.phone}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="body1">{store.contact.phone}</Typography>
        </a>
      </Box>
      <Box display="flex" alignItems="center" style={{ marginBottom: 8, padding: '8px 0' }}>
        <Tooltip title={store.contact.email}>
          <a href={`mailto:${store.contact.email}`} style={{ textDecoration: 'none', color: 'inherit', padding: '0 8px' }}>
            <EmailIcon style={{ marginLeft: 8, cursor: 'pointer' }} />
          </a>
        </Tooltip>
        <Tooltip title="Facebook">
          <a href={`https://facebook.com/${store.contact.socialLinks.facebook}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', padding: '0 8px' }}>
            <FacebookIcon style={{ marginLeft: 8, cursor: 'pointer' }} />
          </a>
        </Tooltip>
        <Tooltip title="Instagram">
          <a href={`https://instagram.com/${store.contact.socialLinks.instagram}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', padding: '0 8px' }}>
            <InstagramIcon style={{ marginLeft: 8, cursor: 'pointer' }} />
          </a>
        </Tooltip>
        <Tooltip title="Twitter">
          <a href={`https://twitter.com/${store.contact.socialLinks.twitter}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', padding: '0 8px' }}>
            <TwitterIcon style={{ marginLeft: 8, cursor: 'pointer' }} />
          </a>
        </Tooltip>
      </Box>
      <Divider style={{ margin: '16px 0' }} />
      <Typography variant="body2" color="textSecondary">
        {faTexts.address}: {store.location.address}
      </Typography>
      <Button variant="contained" color="secondary" style={{ marginTop: 16 }}>
        {faTexts.track_store}
      </Button>
    </Paper>
  );
};

export default StoreDetails;
