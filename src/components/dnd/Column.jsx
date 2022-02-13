import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Droppable } from "react-beautiful-dnd";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Item from "./Item";
import { connect } from "react-redux";
import { IconButton, TextField } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CatalogPopover from "../popover/CatalogPopover";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
// redux actions
import { createCard } from "../../store/actions/card";
import { updateCatalog, deleteCatalog } from "../../store/actions/catalog";

const useStyles = makeStyles({
  column: {
    padding: "24px 0",
    display: "flex",
    flexDirection: "column",
    marginTop: 8,
  },
  item: {
    backgroundColor: "#ededed",
    borderRadius: 8,
    padding: "0px 16px 16px 16px",
    display: "flex",
    flexDirection: "column",
    // flexGrow: 1,
    width: 250,
    marginTop: 8,
    height: "fit-content",
  },
  addBtnContainer: {
    marginTop: "20px",
  },
  addBtnRoot: {
    border: "none",
    textTransform: "none !important",
    color: "#807e7e !important",
    margin: "-10px 0px -5px 0px !important"
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
    },
  },
  itemHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: "3px",
  },
  editContainer: {
    display: "flex",
    flexDirection: "column",
  },
  editTitle: {
    marginTop: "20px !important",
    padding: "-10px !important",
    backgroundColor: "#fff",
    borderRadius: "10px",
    color: "#807e7e !important",
  }
});

const Column = (props) => {
  const classes = useStyles();
  const { col } = props;
  const { list, id, catalogId } = col;
  // states
  const [isAdding, setIsAdding] = useState(false);
  const [input, setInput] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  // event handlers
  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleOpenAdd = () => {
    setIsAdding(true);
  };

  const handleSubmit = () => {
    const data = {
      title: input,
      catalogId: catalogId,
      description: "",
      attachments: [],
    };
    props.createCard(data);
    setIsAdding(false);
    setInput("");
  };

  const handleCancel = () => {
    setIsAdding(false);
    setInput("");
  };

  // popover
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // edit title
  const [isEditTitle, setIsEditTitle] = useState(false);

  const handleCancelEditTitle = () => {
    setIsEditTitle(false);
  };

  const handleEditTitle = () => {
    const data = {
      id: catalogId,
      title: input,
    };
    props.updateCatalog(data);
    setIsEditTitle(false);
  };

  const handleDeleteCatalog = () => {
    props.deleteCatalog(catalogId);
  };

  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div className={classes.column}>
          <div className={classes.item}>
            <div className={classes.itemHeader}>
              {isEditTitle === false ? (
                <h3>{id}</h3>
              ) : (
                <div className={classes.editContainer}>
                  <TextField
                    id="outlined-multiline-static"
                    fullWidth
                    className={classes.editTitle}
                    defaultValue={id}
                    placeholder="Edit title of card"
                    onChange={handleChange}
                  />
                  <div>
                    <Button onClick={handleEditTitle}>Edit title</Button>
                    <IconButton onClick={handleCancelEditTitle}>
                      <CancelIcon />
                    </IconButton>
                  </div>
                </div>
              )}
              <div>
                <IconButton
                  aria-describedby={id}
                  variant="contained"
                  onClick={handleClick}
                >
                  <MoreHorizRoundedIcon />
                </IconButton>
                <CatalogPopover
                  handleClose={handleClose}
                  anchorEl={anchorEl}
                  setIsEditTitle={setIsEditTitle}
                  handleDelete={handleDeleteCatalog}
                />
              </div>
            </div>
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {list.map((card, index) => (
                <Item key={card.id} card={card} index={index} />
              ))}
              {provided.placeholder}

              <div className={classes.addBtnContainer}>
                {isAdding === false ? (
                  <div>
                    <Button
                      onClick={handleOpenAdd}
                      className={classes.addBtnRoot}
                      startIcon={<AddIcon />}
                    >
                      Add a card
                    </Button>
                  </div>
                ) : (
                  <div>
                    <TextField
                      id="outlined-multiline-static"
                      className={classes.addTextArea}
                      multiline
                      rows={3}
                      fullWidth
                      placeholder="Enter a title for this card..."
                      onChange={handleChange}
                    />
                    <div>
                      <Button onClick={handleSubmit}>Add card</Button>
                      <IconButton onClick={handleCancel}>
                        <CancelIcon />
                      </IconButton>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Droppable>
  );
};

const mapStateToProps = ({ card }) => ({
  card: card.card.data,
});

const mapDispatchToProps = {
  createCard,
  updateCatalog,
  deleteCatalog,
};

export default connect(mapStateToProps, mapDispatchToProps)(Column);
