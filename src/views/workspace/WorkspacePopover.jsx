import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import { createBoard } from "../../store/actions/board";

const useStyles = makeStyles({
  actionBtn: {
    textTransform: "none !important",
    color: "#ff3d3d !important"
  },
});

export default function WorkspacePopover(props) {
  const { anchorEl, handleClose, handleDelete } = props;
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
      <Typography sx={{ p: 1 }}>
        <Button
          className={classes.actionBtn}
          onClick={handleDelete}
          color="warning"
          startIcon={<DeleteRoundedIcon />}
        >
          Delete Board
        </Button>
      </Typography>
    </Popover>
  );
}
// const mapStateToProps = ({ }) => ({
//   // boardId: board.board.id,
// });

// const mapDispatchToProps = { createBoard };

// export default connect(mapStateToProps, mapDispatchToProps)(WorkspacePopover);