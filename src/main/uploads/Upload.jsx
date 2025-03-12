import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { Grid } from "@mui/material";
import UploadInput from "./UploadInput";

function ClickableMap({ onClick }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng);
    },
  });
  return null;
}

function Upload() {
  const [formData, setFormData] = useState({
  });
  const [marker, setMarker] = useState(false);
  const handleMapClick = (pr) => {
    setMarker(pr);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={3}>
          <UploadInput
            formData={formData}
            setFormData={setFormData}
            marker={marker}
          />
        </Grid>
        <Grid item xs={9}>
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            style={{ height: "100vh", width: "100%" }}
          >
            <ClickableMap onClick={handleMapClick} />

            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {marker && (
              <>
                <Marker position={marker}></Marker>
              </>
            )}
          </MapContainer>
        </Grid>
      </Grid>
    </>
  );
}

export default Upload;
