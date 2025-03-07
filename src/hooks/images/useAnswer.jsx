import React, { useState } from "react";
import { API } from "../../api/Api";

function useAnswer() {
  const [answer, setResult] = useState({});

  const fetchAnswer = async (params) => {
    try {
      await API.post("api/image/answer", params).then((res) => {
        setResult(res.data);
      });
    } catch (err) {
      throw err;
    }
  };

  return { answer, fetchAnswer };
}

export default useAnswer;
