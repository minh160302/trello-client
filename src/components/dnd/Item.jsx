import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { IconButton } from "@mui/material";
import ModalCard from "../card/ModalCard";
// redux
import { openCard } from "../../store/actions/card";
import { connect } from "react-redux";

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
    props.openCard(card);
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
            <ModalCard open={open} handleClose={handleCloseCard} />
          )}
          <IconButton onClick={handleOpenCard}>
            <ModeEditOutlineIcon />
          </IconButton>
        </div>
      )}
    </Draggable>
  );
};

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {
  openCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
