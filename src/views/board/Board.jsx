import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import BoardView from "../../components/dnd/BoardView";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import { Button, IconButton, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
// redux actions
import { getBoard } from "../../store/actions/board";
import { moveCatalog, createCatalog } from "../../store/actions/catalog";

const useStyles = makeStyles({
  root: {
    margin: "20px",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
  },
  addTextArea: {
    margin: "10px 0px !important",
    maxWidth: "350px",
  },
  addBtnRoot: {
    border: "none",
    textTransform: "none !important",
    color: "black !important",
  },
});

const Board = (props) => {
  const { board } = props;
  const classes = useStyles();
  const boardId = window.location.pathname.split("/")[2];

  // states
  const [isAdding, setIsAdding] = useState(false);
  const initialInputState = {
    title: "",
    description: "",
  };
  const [input, setInput] = useState(initialInputState);

  // fetch again based on situations
  useEffect(() => {
    if (boardId != null) {
      props.getBoard(boardId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardId, props.renderCreateAdd, props.renderCreateCatalog]);

  // event handlers
  const handleOpenAdd = () => {
    setIsAdding(true);
  };

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    const data = {
      title: input.title,
      boardId: boardId,
    };
    props.createCatalog(data);
    setIsAdding(false);
    setInput(initialInputState);
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  return (
    <div className={classes.root}>
      {board != null && (
        <div>
          <h1>{board.title}</h1>
          <div>
            <em>{board.description}</em>
          </div>
          <br></br>
          <div>
            <em>Created at: {board.createdDate}</em>
          </div>
          <br></br>
          <div>
            {isAdding === true ? (
              <div className={classes.inputContainer}>
                <TextField
                  id="outlined-multiline-static"
                  className={classes.addTextArea}
                  placeholder="Catalog title"
                  name="title"
                  onChange={handleChange}
                />
                <div>
                  <Button onClick={handleSubmit}>Create</Button>
                  <IconButton onClick={handleCancel}>
                    <CancelIcon />
                  </IconButton>
                </div>
              </div>
            ) : (
              <div>
                <Button
                  onClick={handleOpenAdd}
                  className={classes.addBtnRoot}
                  startIcon={<AddIcon />}
                >
                  Create New Catalog
                </Button>
              </div>
            )}
          </div>
          <section>
            <BoardView boards={board.catalogs} handleMove={props.moveCatalog} />
          </section>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ board, card, catalog }) => ({
  board: board.board.data,
  renderCreateAdd: card.renderCreateAdd,
  renderCreateCatalog: catalog.renderCreateCatalog,
});

const mapDispatchToProps = {
  getBoard,
  moveCatalog,
  createCatalog,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
