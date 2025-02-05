import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const blueDotSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
    <circle cx="12" cy="12" r="8" fill="#007bff" stroke="rgba(255, 255, 255, 0.7)" stroke-width="4" />
    <circle cx="12" cy="12" r="10" fill="none" stroke="gray" stroke-width="1" />
  </svg>
`;

const userLocationIcon = new L.DivIcon({
  html: blueDotSvg,
  className: 'custom-icon',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const currencyIcons = {
  IRR: new L.DivIcon({
    html: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#4CAF50" />
      <text x="12" y="16" textAnchor="middle" fill="white" fontSize="12" fontFamily="Arial">T</text>
    </svg>`,
    className: 'custom-icon',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  }),
  USD: new L.DivIcon({
    html: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#2196F3" />
      <text x="12" y="16" textAnchor="middle" fill="white" fontSize="12" fontFamily="Arial">$</text>
    </svg>`,
    className: 'custom-icon',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  }),
  GOLD: new L.DivIcon({
    html: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#FFD700" />
      <text x="12" y="16" textAnchor="middle" fill="white" fontSize="12" fontFamily="Arial">G</text>
    </svg>`,
    className: 'custom-icon',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  })
};

const UserLocationMarker = ({ onLocate }) => {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        map.setView([latitude, longitude], 13);
        onLocate([latitude, longitude]);
      });
    }
  }, [map, onLocate]);

  return position === null ? null : (
    <Marker position={position} icon={userLocationIcon}>
      <Popup>موقعیت شما</Popup>
    </Marker>
  );
};

const LocateButton = ({ userPosition }) => {
  const map = useMap();

  const handleLocateUser = () => {
    if (userPosition) {
      map.setView(userPosition, 13);
    }
  };

  return (
    <button className="locate-button" onClick={handleLocateUser}>موقعیت من</button>
  );
};

const Map = ({ stores }) => {
  const [userPosition, setUserPosition] = useState(null);
  const [nearbyStores, setNearbyStores] = useState([]);

  useEffect(() => {
    if (userPosition) {
      const filteredStores = stores.filter(store => {
        const distance = Math.sqrt(
          Math.pow(store.location.latitude - userPosition[0], 2) +
          Math.pow(store.location.longitude - userPosition[1], 2)
        );
        return distance < 0.1; // Adjust the distance threshold as needed
      });
      setNearbyStores(filteredStores);
    }
  }, [userPosition, stores]);

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <MapContainer center={[36.2880, 59.6150]} zoom={13} style={{ height: '100%', width: '100%' }} attributionControl={false} zoomControl={false}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <UserLocationMarker onLocate={setUserPosition} />
        {nearbyStores.map((store) => (
          <Marker key={store.id} position={[store.location.latitude, store.location.longitude]} icon={currencyIcons[store.supportedCurrencies[0]]}>
            <Popup>
              {store.name}
            </Popup>
          </Marker>
        ))}
        {userPosition && <LocateButton userPosition={userPosition} />}
      </MapContainer>
    </div>
  );
};

export default Map;
