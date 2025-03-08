import React, { useEffect } from "react";
import useLoadImages from "../hooks/images/useLoadImages";
import useNextImage from "../hooks/images/useNextImage";
import Gallery from "../main/gallery/Gallery";
import Map from "./Map";

function MainMap() {
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

export default MainMap;
