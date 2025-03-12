import React from "react";
import { API } from "../../api/Api";

function useUpdateImage() {
  const updateImage = async (params) => {
    try {
      await API.put("/api/image", params);
    } catch (err) {
      throw err;
    }
  };

  return { updateImage };
}

export default useUpdateImage;
