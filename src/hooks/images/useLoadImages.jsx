import React, { useState } from "react";
import { API } from "../../api/Api";

function useLoadImages() {
  const [result, setResult] = useState({});

  const loadImages = async () => {
    try {
      await API.get("/api/image/load").then((res) => {
        setResult(res.data);
      });
    } catch (err) {
      throw err;
    }
  };

  return { result, loadImages };
}

export default useLoadImages;
