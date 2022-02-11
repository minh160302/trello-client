import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { IconButton } from "@mui/material";
import ModalCard from "../card/ModalCard";

const useStyles = makeStyles({
  item: {
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: "8px 12px",
    transition: "background-color .8s ease-out",
    marginTop: 8,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    ":hover": {
      backgroundColor: "#fff",
      transition: "background-color .1s ease-in",
    },
  },
});

const Item = (props) => {
  const { card, index } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpenCard = () => {
    setOpen(true);
    // fetch card here
  };

  const handleCloseCard = () => {
    setOpen(false);
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          className={classes.item}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <span>{card.title}</span>
          {open === true && (
            <ModalCard card={card} open={open} handleClose={handleCloseCard} />
          )}
          <IconButton onClick={handleOpenCard}>
            <ModeEditOutlineIcon />
          </IconButton>
        </div>
      )}
    </Draggable>
  );
};

export default Item;
