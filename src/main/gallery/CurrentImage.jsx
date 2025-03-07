import { Box, Dialog, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { CurrentImageContext } from "./Gallery";
import { BASE } from "../../api/Api";

function CurrentImage({ nextImage, currentImageOpen, setCurrentImageOpen }) {
  // const { nextImage } = useContext(CurrentImageContext);
  const handleClose = () => {
    setCurrentImageOpen(false);
  };
  useEffect(() => {
    console.log(nextImage);
  }, [nextImage]);

  return (
    <>
      <Dialog
        open={currentImageOpen}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: "1000px",
            padding: "10px",
            overflow: "auto",
          },
        }}
      >
        <Stack direction={"row"} gap={"10px"}>
          <Box>
            {nextImage && (
              <>
                <div className="current-image-cover">
                  <img
                    src={BASE + "/images/" + nextImage?.path}
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                    alt=""
                  />
                </div>
              </>
            )}
          </Box>
          {/* <Box
            style={{
              minWidth: "200px",
            }}
          >
            <Stack alignItems={"flex-start"} direction={"column"}>
              <Typography>
                {nextImage?.sender?.name} {nextImage?.sender?.surname}
              </Typography>
              <Typography fontWeight={"bold"}>{nextImage?.tookBy}</Typography>
            </Stack>
          </Box> */}
        </Stack>
      </Dialog>
    </>
  );
}

export default CurrentImage;
