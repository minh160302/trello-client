import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  actionBtn: {
    textTransform: "none !important",
  },
});

export default function CatalogPopover(props) {
  const { anchorEl, handleClose, setIsEditTitle, handleDelete } = props;
  const classes = useStyles();

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleEditTitle = () => {
    setIsEditTitle(true);
  };

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
      <Typography sx={{ p: 1 }}>
        <Button
          className={classes.actionBtn}
          onClick={handleEditTitle}
          color="secondary"
          startIcon={<EditRoundedIcon />}
        >
          Edit catalog title
        </Button>
      </Typography>
      <Typography sx={{ p: 1 }}>
        <Button
          className={classes.actionBtn}
          onClick={handleDelete}
          color="warning"
          startIcon={<DeleteRoundedIcon />}
        >
          Delete catalog
        </Button>
      </Typography>
    </Popover>
  );
}
