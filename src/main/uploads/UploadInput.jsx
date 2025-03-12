import React, { useEffect, useState } from "react";
import { Box, Link, Stack, Typography } from "@mui/material";
import "../../styles/upload.scss";
import useUploadImage from "../../hooks/images/useUploadImage";

function UploadInput({ marker, setFormData, formData }) {
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState(null);

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    let params = { ...formData, long: marker.lng, lat: marker.lat };
    try {
      await upload(params);
      setMessage({ type: "success", text: "ფოტო ატვირთულია" });
      setFormData({});
      window.location.reload()
    } catch (err) {
      setMessage({ type: "danger", text: "error" });
      throw err;
    }
  };
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
              placeholder="Camera"
              name="TookBy"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="name"
              name="Sender.Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="surname"
              name="Sender.Surname"
              value={formData.surname}
              onChange={handleChange}
            />
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
            <Box mt={3}>
              {message && <Typography mt={2}>{message.text}</Typography>}
            </Box>
          </Stack>
        </form>
            <button className="get-back-button">
              <Link href="/">დაბრუნება</Link>
            </button>
      </Box>
    </Box>
  );
}

export default UploadInput;
