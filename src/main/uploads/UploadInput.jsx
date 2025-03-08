import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import "../../styles/upload.scss";
import useUploadImage from "../../hooks/images/useUploadImage";

function UploadInput({ marker, setFormData, formData }) {
  const [preview, setPreview] = useState(null);
  const { upload } = useUploadImage();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    let params = { ...formData, lng: marker.lng, lat: marker.lat };
    upload(params);
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  return (
    <Box>
      <Box
        p={2}
        className="upload-input"
        style={{
          height: "90vh",
          overflow: "auto",
        }}
      >
        {preview && (
          <Box mt={1}>
            <img src={preview} alt="Preview" width={"100%"} />
          </Box>
        )}
        <form encType="multipart/form-data">
          <Stack direction="column" gap="10px">
            <input type="file" name="Image" onChange={handleImageChange} />
            <input
              type="text"
              placeholder="name"
              name="TookBy"
              onChange={handleChange}
            />
{/*             
            <input
              type="text"
              placeholder="surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
            /> */}
            <Stack direction="row" justifyContent="space-between" gap="10px">
              <input
                type="text"
                style={{ width: "100%" }}
                placeholder={formData.lat}
                value={marker.lat}
                onChange={handleChange}
              />
              <input
                type="text"
                style={{ width: "100%" }}
                value={marker.lng}
                onChange={handleChange}
              />
            </Stack>
            <button type="submit" onClick={handleSubmit}>
              ატვირთვა
            </button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default UploadInput;
