import React, { useEffect, useState } from "react";
import "../../styles/navigation.scss";
import { Stack } from "@mui/material";
import ScoreCounter from "../components/ScoreCounter";
import GameEnded from "../components/GameEnded";

function Navigations({ data, answer, handleSubmit, nextImage }) {
  const MAX_SCORE = 10000;
  const [gameEnded, setGameEnded] = useState(false);
  const [score, setScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [open, setOpen] = useState(false);
  const [distance, setDistance] = useState(0);
  const [record, setRecord] = useState(
    JSON.parse(localStorage.getItem("record") || "0")
  );
  useEffect(() => {
    console.log(record);
    if (record == 0) {
      localStorage.setItem("record", JSON.stringify(0));
    }
  }, []);
  useEffect(() => {
    if (answer?.distance !== undefined) {
      setDistance(answer.distance.toFixed(0));
      setScore(
        (prevScore) =>
          prevScore + (MAX_SCORE - Number(answer.distance.toFixed(0)) * 3)
      );
      setCurrentScore(MAX_SCORE - Number(answer.distance.toFixed(0)) * 3);
    }
  }, [answer]);

  const submit = () => {
    handleSubmit();
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  useEffect(() => {
    if (answer?.questionsRemaining == 0) {
      setTimeout(() => {
        setGameEnded(true);
      }, 2000);
    }
  }, [answer]);

  useEffect(() => {
    if (score > record) {
      localStorage.setItem("record", JSON.stringify(score));
    }
  }, [score]);

  return (
    <>
      {gameEnded && <GameEnded finalScore={score} />}
      {open && <ScoreCounter to={currentScore} open={open} setOpen={setOpen} />}
      <div className="top-navigation-container">
        <div className="primary-button km">{distance} კმ</div>
      </div>
      <div className="navigations-container">
        <Stack direction={"row"} gap={"10px"}>
          <button className="primary-button confrim" onClick={submit}>
            დადასტურება
          </button>
          <button className="primary-button question-counter">
            {data?.count - answer?.questionsRemaining}/{data?.count}
          </button>
          <button className="primary-button score">{score}</button>
          <Stack direction={"row"}>
            <button className="primary-button best">რეკორდი: {record}</button>
          </Stack>
        </Stack>
      </div>
    </>
  );
}

export default Navigations;
