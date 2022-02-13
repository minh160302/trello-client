import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import ModalCard from "../card/ModalCard";
// redux
import { getCardById, clearCard } from "../../store/actions/card";
import { connect } from "react-redux";

const useStyles = makeStyles({
  item: {
    backgroundColor: "#fff",
    borderRadius: 8,
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
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  thumbnailImg: {
    width: "100%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardTitle: {
    padding: "6px 12px"
  }
});

const Item = (props) => {
  const { card, index } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleGetCardById = () => {
    props.getCardById(card.id);
    setOpen(true);
  };

  const handleCloseCard = () => {
    props.clearCard();
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
          <div onClick={handleGetCardById} className={classes.contentWrapper}>
            {props.card.attachments?.length > 0 && (
              <img
                className={classes.thumbnailImg}
                src={props.card.attachments[0]}
                alt=""
              />
            )}
            <span className={classes.cardTitle}>{card.title}</span>
          </div>
          {open === true && (
            <ModalCard open={open} handleClose={handleCloseCard} />
          )}
        </div>
      )}
    </Draggable>
  );
};

// eslint-disable-next-line no-empty-pattern
const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {
  getCardById,
  clearCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
