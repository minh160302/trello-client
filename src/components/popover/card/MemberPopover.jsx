import React, { useEffect, useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
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
  attachmentContainer: {
    width: "300px",
    margin: "10px",
  },
  accountIcon: {
    marginTop: "-10px !important"
  },
  title: {
    borderBottom: "1px solid black",
  }
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
      <div className={classes.attachmentContainer}>
        <section className={classes.popoverWrapper}>
          <Typography sx={{ p: 1 }} fontWeight="bold" className={classes.title}>Board members </Typography>
          <Typography sx={{ p: 1 }}>
            1. Person A (Admin)
          </Typography>
          <Typography sx={{ p: 1 }}>
            2. Person B
          </Typography>
        </section>
      </div>
    </Popover>
  );
};

const mapStateToProps = ({ }) => ({});

const mapDispatchToProps = {
  getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberPopover);
