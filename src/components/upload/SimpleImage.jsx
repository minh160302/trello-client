import React from "react";
import { Dialog } from "@mui/material";

const SimpleImage = (props) => {
  const { onClose, open, url } = props;

  const handleClose = () => {
    onClose(true);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <img src={url} alt="" />
    </Dialog>
  );
};

export default SimpleImage;
