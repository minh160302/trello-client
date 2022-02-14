import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import FileUpload from "../../upload/FileUpload";

const useStyles = makeStyles({
  actionBtn: {
    textTransform: "none !important",
    margin: "40px !important"
    // marginLeft: "100px !important"
  },
  attachmentContainer: {
    width: "300px",
    margin: "10px",
  },
  title: {
    borderBottom: "1px solid black",
  }
});

export default function AttachmentPopover(props) {
  const { anchorEl, handleClose } = props;
  const classes = useStyles();

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <div className={classes.attachmentContainer}>
        <Typography sx={{ p: 1 }} fontWeight="bold" className={classes.title}>Select a file</Typography>
        <br></br>
        <div classname={classes.actionBtn}>
          <FileUpload />
        </div>
        <br />
      </div>
    </Popover>
  );
}
