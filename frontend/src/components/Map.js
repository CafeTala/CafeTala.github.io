import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const blueDotSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <circle cx="12" cy="12" r="10" fill="#007bff" />
  </svg>
`;

const userLocationIcon = new L.DivIcon({
  html: blueDotSvg,
  className: 'custom-icon',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

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

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <MapContainer center={userPosition || [35.6892, 51.3890]} zoom={13} style={{ height: '100%', width: '100%' }} attributionControl={false} zoomControl={false}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <UserLocationMarker onLocate={setUserPosition} />
        {stores.map((store) => (
          <Marker key={store.id} position={[store.location.latitude, store.location.longitude]}>
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
