import { useEffect, useState } from "react";
import Map from "./map/Map";
import "./styles/index.scss";
import Gallery from "./main/gallery/Gallery";
import useLoadImages from "./hooks/images/useLoadImages";
import useNextImage from "./hooks/images/useNextImage";
import "./styles/components.scss";
import MainMap from "./map/MainMap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Upload from "./main/uploads/Upload";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainMap />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
