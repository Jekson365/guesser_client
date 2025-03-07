import React, { useEffect } from "react";
import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Navigations from "../main/navaigations/Navigations";
import useAnswer from "../hooks/images/useAnswer";

function ClickableMap({ onClick }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng);
    },
  });
  return null;
}
function Map({ data, nextImage, fetchNextImage }) {
  const [answered, setAnswered] = useState(false);
  const [answerParams, setAnswerParams] = useState({});
  const [marker, setMarker] = useState(null);
  const { answer, fetchAnswer } = useAnswer();

  const handleMapClick = (latlng) => {
    setMarker(latlng);
    setAnswerParams({
      ...answerParams,
      lat: nextImage?.lat,
      lng: nextImage?.long,
    });
  };
  const handleSubmit = async () => {
    var params = {
      ...answerParams,
      answeredLat: marker?.lat,
      answeredLng: marker?.lng,
    };

    await fetchAnswer(params);
    setAnswered(true);
    setTimeout(() => {
      fetchNextImage().then((res) => {
        setAnswered(false);
      });
    }, 2000);
  };

  return (
    <>
      <Navigations
        answer={answer}
        nextImage={nextImage}
        data={data}
        handleSubmit={handleSubmit}
      />
      <MapContainer
        zoom={3}
        center={[45, 45]}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <ClickableMap onClick={handleMapClick} />

        {marker ? (
          <Marker position={marker}>
            <Popup>
              Latitude: {marker.lat.toFixed(4)}, Longitude:{" "}
              {marker.lng.toFixed(4)}
            </Popup>
          </Marker>
        ) : (
          <></>
        )}

        {answered ? (
          <>
            <Marker
              position={[
                nextImage?.lat !== undefined && nextImage?.lat,
                nextImage?.long !== undefined && nextImage?.long,
              ]}
            ></Marker>
          </>
        ) : null}
        {marker && nextImage && answered && (
          <Polyline
            positions={[
              [marker?.lat, marker?.lng],
              [nextImage?.lat, nextImage?.long],
            ]}
            color="black"
          />
        )}
      </MapContainer>
    </>
  );
}

export default Map;
