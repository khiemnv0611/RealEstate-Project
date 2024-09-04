import React, { useEffect, useState } from "react";
import { apiGetLongtitudeAndLatitudeFromAddress } from "~/apis/beyond";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const Map = ({ address = "", zoom = 12 }) => {
  const [center, setCenter] = useState(null);

  useEffect(() => {
    const fetchCenter = async () => {
      const response = await apiGetLongtitudeAndLatitudeFromAddress(address);
      if (response.status === 200 && response.data.features?.length > 0) {
        setCenter([
          response.data.features[0]?.geometry?.coordinates[1],
          response.data.features[0]?.geometry?.coordinates[0],
        ]);
        // Test
        // navigator.geolocation.getCurrentPosition((position) => {
        //   setCenter([position.coords.latitude, position.coords.longitude]);
        // });
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCenter([position.coords.latitude, position.coords.longitude]); // Vị trí người dùng
          },
          (error) => {
            console.error("Error getting location", error);
            setCenter([0, 0]); // Vị trí mặc định
          }
        );
      }
    };

    fetchCenter();
  }, [address]);

  return (
    <div>
      {center && center.length > 0 && (
        <MapContainer center={center} zoom={zoom} className="w-full h-full z-0">
          <TileLayer url={url} attribution={attribution} />
          <Marker position={center}>
            <Popup>{address}</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default Map;
