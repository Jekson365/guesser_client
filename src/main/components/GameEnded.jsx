import { Backdrop, Stack } from "@mui/material";
import React from "react";

function GameEnded({ finalScore }) {
  const handleEnd = () => {
    window.location.reload();
  };
  return (
    <Backdrop
      open={true}
      sx={(theme) => ({
        background: "rgba(0,0,0,0.3)",
        zIndex: theme.zIndex.drawer + 1,
      })}
    >
      <Stack direction={"column"} alignItems={'center'} gap={'10px'}>
        <h1 className="result-score">{finalScore}</h1>
        <button className="primary-button confrim" onClick={handleEnd}>
          ხელახლა
        </button>
      </Stack>
    </Backdrop>
  );
}

export default GameEnded;
