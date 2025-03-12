import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useImages from "../../hooks/images/useImages";
import { CircularProgress } from "@mui/material";
import { BASE } from "../../api/Api";
import CurrentImage from "../gallery/CurrentImage";
import useUpdateImage from "../../hooks/images/useUpdateImage";

function Admin() {
  const { loading, data, fetchImages } = useImages();
  const { updateImage } = useUpdateImage();

  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState({});
  const handleCurrentImage = (e) => {
    setOpen(true);
    setCurrentImage(e);
  };

  const handleUpdate = async (e, draft) => {
    await updateImage({ imageId: e.id, drafted: draft });
    window.location.reload();
  };

  useEffect(() => {
    fetchImages();
  }, []);
  return (
    <>
      <CurrentImage
        nextImage={currentImage}
        setCurrentImageOpen={setOpen}
        currentImageOpen={open}
      />
      <TableContainer
        component={Paper}
        style={{
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Id</TableCell>
              <TableCell align="left">name</TableCell>
              <TableCell align="left">surname</TableCell>
              <TableCell align="left">image</TableCell>
              <TableCell align="righr">update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <>
                <CircularProgress />
              </>
            ) : (
              <>
                {data.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="left">
                      {row.id}
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.surname}</TableCell>
                    <TableCell
                      align="left"
                      onClick={() => handleCurrentImage(row)}
                    >
                      <img width={"10%"} src={BASE + "/images/" + row.path} />
                    </TableCell>
                    <TableCell>
                      {row.drafted ? (
                        <>
                          <button
                            className="primary-button st-green"
                            onClick={() => handleUpdate(row, false)}
                          >
                            დადასტურება
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="primary-button confrim"
                            onClick={() => handleUpdate(row, true)}
                          >
                            წაშლა
                          </button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Admin;
