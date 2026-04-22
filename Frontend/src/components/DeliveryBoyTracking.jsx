import React, { useEffect } from "react";
import scooter from "../assets/scooter.png";
import home from "../assets/home1.avif";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";

const deliveryBoyIcon = new L.icon({
  iconUrl: scooter,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
});

const customerIcon = new L.icon({
  iconUrl: home,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
});

function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] != null && center[1] != null) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
}

const DeliveryBoyTracking = ({ data }) => {
  console.log("DeliveryBoyTracking Data:", data);
  const deliveryBoyLat = data?.deliveryBoyLocation?.lat;
  const deliveryBoyLon = data?.deliveryBoyLocation?.lon;
  const customerLat = data?.customerLocation?.lat;
  const customerLon = data?.customerLocation?.lon;

  console.log("Coords:", {
    deliveryBoyLat,
    deliveryBoyLon,
    customerLat,
    customerLon,
  });

  // Use more robust check (null/undefined check)
  const hasCoordinates =
    deliveryBoyLat != null &&
    deliveryBoyLon != null &&
    customerLat != null &&
    customerLon != null;

  if (!hasCoordinates) {
    return (
      <div className="w-full h-[400px] mt-3 rounded-xl bg-gray-100 flex flex-col items-center justify-center text-gray-400 border border-dashed border-gray-300">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff4d2d] mb-2"></div>
        <p className="font-medium text-sm">Waiting for live location data...</p>
        <p className="text-xs mt-1 text-gray-300">(Coordinates missing)</p>
      </div>
    );
  }

  const path = [
    [deliveryBoyLat, deliveryBoyLon],
    [customerLat, customerLon],
  ];

  const center = [deliveryBoyLat, deliveryBoyLon];

  return (
    <div className="w-full h-[400px] mt-3 rounded-xl overflow-hidden shadow-md border border-gray-200">
      <MapContainer
        key={`${deliveryBoyLat}-${deliveryBoyLon}`}
        className="w-full h-full"
        center={center}
        scrollWheelZoom={false}
        zoom={15}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RecenterMap center={center} />
        <Marker
          position={[deliveryBoyLat, deliveryBoyLon]}
          icon={deliveryBoyIcon}
        >
          <Popup>Delivery Boy (Live)</Popup>
        </Marker>
        <Marker position={[customerLat, customerLon]} icon={customerIcon}>
          <Popup>Delivery Address</Popup>
        </Marker>
        <Polyline
          pathOptions={{ color: "#ff4d2d", weight: 4 }}
          positions={path}
        />
      </MapContainer>
    </div>
  );
};

export default DeliveryBoyTracking;
