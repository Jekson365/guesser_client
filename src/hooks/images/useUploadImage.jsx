import React, { useState } from "react";
import { API } from "../../api/Api";

function useUploadImage() {
  const upload = async (params) => {
    await API.post("/api/image", params, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      console.log(res);
    });
  };

  return { upload };
}

export default useUploadImage;
