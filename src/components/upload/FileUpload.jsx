/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { createRef, useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
// @mui/icons-material
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { upload } from "../../store/actions/card";
import { connect } from "react-redux";

const useStyles = makeStyles({
  root: {
    "& > *": {},
  },
  input: {
    display: "none",
  },
  box: {
    position: "relative",
    width: "80%",
    height: "auto",
    margin: "auto",
  },
  image: {
    maxWidth: "100%",
  },
});

const FileUpload = (props) => {
  const classes = useStyles();

  let fileInput = createRef();

  const handleImageChange = async (e) => {
    e.preventDefault();
    let file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      props.upload(formData);
    }
  };

  return (
    <div className={classes.root}>
      <input type="file" onChange={handleImageChange} ref={fileInput} />
    </div>
  );
};

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {
  upload,
};

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);
