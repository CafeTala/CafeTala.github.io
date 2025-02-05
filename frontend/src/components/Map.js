import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ stores }) => {
  return (
    <MapContainer center={[35.6892, 51.3890]} zoom={13} style={{ height: '100%', width: '100%' }} attributionControl={false}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      {stores.map((store) => (
        <Marker key={store.id} position={[store.location.latitude, store.location.longitude]}>
          <Popup>
            {store.name}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
