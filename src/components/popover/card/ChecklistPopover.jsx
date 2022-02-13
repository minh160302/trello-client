import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { TextField } from "@mui/material";
// redux
import { connect } from "react-redux";
import { createChecklist } from "../../../store/actions/card";

const useStyles = makeStyles({
  actionBtn: {
    textTransform: "none !important",
  },
  checklistTitle: {
    textAlign: "center",
  },
  checklistContainer: {
    width: "300px",
    margin: "10px",
  },
  addBtn: {
    marginTop: "8px !important",
  },
});

function ChecklistPopover(props) {
  const { anchorEl, handleClose } = props;
  const classes = useStyles();
  const [title, setTitle] = useState("");

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAdd = () => {
    props.createChecklist({
      cardId: props.cardId,
      title: title,
      tasks: [],
    });
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
      <div className={classes.checklistContainer}>
        <Typography
          classes={{
            root: classes.checklistTitle,
          }}
          sx={{ p: 1 }}
        >
          Checklist
        </Typography>
        <TextField
          id="outlined-multiline-static"
          fullWidth
          placeholder="Enter the title for this checklist"
          onChange={handleChange}
        />
        <Button onClick={handleAdd} className={classes.addBtn}>
          Add
        </Button>
      </div>
    </Popover>
  );
}

const mapStateToProps = ({ card }) => ({
  cardId: card.card.id,
});

const mapDispatchToProps = { createChecklist };

export default connect(mapStateToProps, mapDispatchToProps)(ChecklistPopover);
