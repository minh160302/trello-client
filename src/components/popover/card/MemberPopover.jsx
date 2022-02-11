import React, { useEffect, useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
//redux
import { getUsers } from "../../../store/actions/auth";
import { connect } from "react-redux";

const useStyles = makeStyles({
  actionBtn: {
    textTransform: "none !important",
  },
  popoverWrapper: {
    padding: "6px",
  },
});

const MemberPopover = (props) => {
  const { anchorEl, handleClose } = props;
  const classes = useStyles();

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // useEffect(() => {
  //   props.getUsers();
  // }, [open]);

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
      <section className={classes.popoverWrapper}>
        <Typography sx={{ p: 1 }}>member</Typography>
        <Typography sx={{ p: 1 }}>b</Typography>
      </section>
    </Popover>
  );
};

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {
  getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberPopover);
