import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/styles';
import { Droppable } from 'react-beautiful-dnd'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Item from './Item'
import { connect } from 'react-redux';
import { IconButton, TextField } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
// redux actions
import { createCard } from "../../store/actions/card"

const useStyles = makeStyles({
  column: {
    padding: "24px 0",
    display: "flex",
    flexDirection: "column",
    marginTop: 8
  },
  item: {
    backgroundColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    // flexGrow: 1,
    width: 250,
    marginTop: 8,
    height: "fit-content"
  },
  addBtnContainer: {
    marginTop: "20px"
  },
  addBtnRoot: {
    border: "none",
    textTransform: "none !important",
    color: "black !important"
  },
  addTextArea: {
    border: "none",
    background: "#fff",
    borderRadius: "10px",
    "&:hover": {
      border: "0px !important",
    },
    "&:focus": {
      border: "none !important",
    }
  }
})

const Column = (props) => {
  const classes = useStyles();
  const { col } = props;
  const { list, id, catalogId } = col;
  // states
  const [isAdding, setIsAdding] = useState(false);
  const [input, setInput] = useState("");
  const [shouldRender, setShouldRender] = useState(false);

  // event handlers
  const handleChange = (event) => {
    setInput(event.target.value);
  }

  const handleOpenAdd = () => {
    setIsAdding(true);
  }

  const handleSubmit = () => {
    const data = {
      title: input,
      catalogId: catalogId,
      description: "",
      attachments: []
    }
    props.createCard(data);
    setIsAdding(false);
    setInput("");
  }

  const handleCancel = () => {
    setIsAdding(false);
    setInput("");
  }

  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div className={classes.column}>
          <h2>{id}</h2>
          <div className={classes.item} {...provided.droppableProps} ref={provided.innerRef}>
            {list.map((card, index) => (
              <Item key={card.id} card={card} index={index} />
            ))}
            {provided.placeholder}

            <div className={classes.addBtnContainer}>
              {
                isAdding === false
                  ? <div>
                    <Button onClick={handleOpenAdd} className={classes.addBtnRoot} startIcon={<AddIcon />}>
                      Add a card
                    </Button>
                  </div>
                  : <div>
                    <TextField
                      id="outlined-multiline-static"
                      className={classes.addTextArea}
                      multiline
                      rows={3}
                      fullWidth
                      placeholder='Enter a title for this card...'
                      onChange={handleChange}
                    />
                    <div>
                      <Button onClick={handleSubmit}>Add card</Button>
                      <IconButton onClick={handleCancel}><CancelIcon /></IconButton>
                    </div>
                  </div>
              }
            </div>
          </div>
        </div>
      )}
    </Droppable>
  )
}

const mapStateToProps = ({ card }) => ({
  card: card.card.data,
})

const mapDispatchToProps = {
  createCard,
}

export default connect(mapStateToProps, mapDispatchToProps)(Column);