import React, { createContext, useEffect, useState } from "react";
import "../../styles/gallery.scss";
import { Box, Stack } from "@mui/material";
import CurrentImage from "./CurrentImage";
import { BASE } from "../../api/Api";

export const CurrentImageContext = createContext();

function Gallery({ nextImage }) {
  const [currentImageOpen, setCurrentImageOpen] = useState(false);

  const handleCurrentImage = () => {
    setCurrentImageOpen(true);
  };

  return (
    <>
      <CurrentImageContext.Provider>
        <CurrentImage
          nextImage={nextImage}
          setCurrentImageOpen={setCurrentImageOpen}
          currentImageOpen={currentImageOpen}
        />
      </CurrentImageContext.Provider>
      <div className="gallery">
        <Box className="gallery-box">
          <Stack direction={"column"} gap={"10px"}>
            <div className="image-cover" onClick={handleCurrentImage}>
              <img src={BASE + "/images/" + nextImage?.path} />
            </div>
          </Stack>
        </Box>
      </div>
    </>
  );
}

export default Gallery;
