import React, { useState } from "react";
import { API } from "../../api/Api";

function useNextImage() {
  const [nextImage, setNextImage] = useState();

  const fetchNextImage = async () => {
    try {
      const result = await API.get("api/image/next");
      setNextImage(result.data);
      return result.data;
    } catch (err) {
      throw err;
    }
  };

  return { nextImage, fetchNextImage };
}

export default useNextImage;
