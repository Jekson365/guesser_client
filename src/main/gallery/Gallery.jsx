import React, { createContext, useEffect, useState } from "react";
import "../../styles/gallery.scss";
import { Box, Link, Stack, Typography } from "@mui/material";
import CurrentImage from "./CurrentImage";
import { BASE } from "../../api/Api";

export const CurrentImageContext = createContext();

function Gallery({ nextImage }) {
  const [currentImageOpen, setCurrentImageOpen] = useState(false);

  const handleCurrentImage = () => {
    setCurrentImageOpen(true);
  };
  useEffect(() => {
    console.log(nextImage);
  }, []);
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
            <Stack direction={"row"}>
              <Typography>
                <span style={{ fontSize: "15px" }}>გამომგზავნი </span>
                {nextImage?.sender?.name} {nextImage?.sender?.surname}
              </Typography>
            </Stack>
            <Stack direction={"row"}>
              <Typography>
                <span style={{ fontSize: "15px" }}>კამერა:</span>{" "}
                {nextImage?.tookBy}
              </Typography>
            </Stack>
          </Stack>
        </Box>
        <button className="primary-button st-green">
          <Link
            style={{
              color: "white",
              textDecoration: "none",
            }}
            href={"/upload"}
          >
            ფოტოს გაგზავნა
          </Link>
        </button>
      </div>
    </>
  );
}

export default Gallery;
