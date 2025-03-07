import React, { useState, useEffect } from "react";
import { Backdrop, Dialog, Typography } from "@mui/material";

function ScoreCounter({ to, open, setOpen }) {
  const [score, setScore] = useState(0);
  const targetScore = to;
  const duration = 1000;
  const incrementSpeed = 10;

  useEffect(() => {
    if (open) {
      const incrementStep = targetScore / (duration / incrementSpeed);
      const interval = setInterval(() => {
        setScore((prev) => {
          const nextScore = Math.min(prev + incrementStep, targetScore);
          if (nextScore === targetScore) clearInterval(interval);
          return nextScore;
        });
      }, incrementSpeed);
      return () => clearInterval(interval);
    }
  }, [open, targetScore]);

  return (
    <>
      <Backdrop
        open={open}
        sx={(theme) => ({
          background: "rgba(0,0,0,0.1)",
          zIndex: theme.zIndex.drawer + 1,
        })}
      >
        <div
          className="counter-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div className="score">{Math.round(score)}</div>
        </div>
      </Backdrop>
    </>
  );
}

export default ScoreCounter;
