import React, { useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

// Fix for default marker icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
// });

// 🔄 Helper component to move the map
const FlyToDistrict = ({ position, zoom }) => {
  const map = useMap();
  map.setView(position, zoom);
  return null;
};

const BangladeshMap = ({ serviceeCenters }) => {
  const [searchText, setSearchText] = useState('');
  const [flyTo, setFlyTo] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(10);
  const popupRefs = useRef({});

  const handleSearch = () => {
    const match = serviceeCenters.find(center =>
      center.district.toLowerCase().includes(searchText.toLowerCase())
    );

    if (match) {
      setFlyTo([match.latitude, match.longitude]);
      setZoomLevel(11);

      // Open popup after a slight delay
      setTimeout(() => {
        if (popupRefs.current[match.district]) {
          popupRefs.current[match.district].openPopup();
        }
      }, 400);
    } else {
      alert('District not found');
    }
  };

  return (
    <div className="w-full px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-4">
        We are available in 64 districts
      </h2>

      {/* 🔍 Search Box */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search district..."
          className="input input-bordered w-64 mr-2"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* 🗺️ Map Section */}
      <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
        <MapContainer
          center={[23.685, 90.3563]}
          zoom={7}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {serviceeCenters.map((center, index) => (
            <Marker
              key={index}
              position={[center.latitude, center.longitude]}
              ref={(ref) => (popupRefs.current[center.district] = ref)}
            >
              <Popup>
                <strong>{center.district}</strong>
                <br />
                Covered: {center.covered_area.join(', ')}
              </Popup>
            </Marker>
          ))}

          {flyTo && <FlyToDistrict position={flyTo} zoom={zoomLevel} />}
        </MapContainer>
      </div>
    </div>
  );
};

export default BangladeshMap;
