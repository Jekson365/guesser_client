import { useEffect, useState } from "react";
import Map from "./map/Map";
import "./styles/index.scss";
import Gallery from "./main/gallery/Gallery";
import useLoadImages from "./hooks/images/useLoadImages";
import useNextImage from "./hooks/images/useNextImage";
import './styles/components.scss'

function App() {
  const { result, loadImages } = useLoadImages();
  const { nextImage, fetchNextImage } = useNextImage();

  useEffect(() => {
    const fetch = async () => {
      await loadImages();
      await fetchNextImage();
    };
    fetch();
  }, []);
  return (
    <>
      <Gallery nextImage={nextImage} />
      <Map
        data={result}
        nextImage={nextImage}
        fetchNextImage={fetchNextImage}
      />
    </>
  );
}

export default App;
