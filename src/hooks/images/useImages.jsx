import React, { useState } from "react";
import { API } from "../../api/Api";

function useImages() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchImages = async () => {
    try {
      await API.get("api/image").then((res) => {
        setData(res.data);
        setLoading(false);
      });
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  return { loading, data, fetchImages };
}

export default useImages;
