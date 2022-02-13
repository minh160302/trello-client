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
    marginTop: -20,
    height: "100vh",
    overflowY: "auto",
    backgroundColor: "#fdc985",
  },
  inputContainer: {
    marginLeft: 30,
    display: "flex",
    flexDirection: "column",
  },
  addTextArea: {
    margin: "10px 0px !important",
    maxWidth: "350px",
    backgroundColor: "#FFFFFF",
    borderRadius: "10px"
  },
  addBtnRoot: {
    border: "none",
    textTransform: "none !important",
    color: "white !important",
    borderRadius: "0px 8px 8px !important",
    backgroundColor: "#0089d9 !important",
  },
  boardName: {
    padding: "20px 0px 20px 30px",
    color: "black",
  },
  infoTopCorner: {
    padding: "0px 0px 20px 30px",
    color: "black",
  },
  catalogs: {
    marginLeft: 30,
  }
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
          <h2 className={classes.boardName}>{board.title}</h2>
          <div className={classes.infoTopCorner}>
            <em>{board.description}</em>
          </div>
          <div>
            <em className={classes.infoTopCorner}>Created at: {board.createdDate}</em>
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
                  <Button className={classes.addBtnRoot} onClick={handleSubmit}>
                    Create
                  </Button>
                  <IconButton onClick={handleCancel}>
                    <CancelIcon />
                  </IconButton>
                </div>
              </div>
            ) : (
              <div className={classes.catalogs}>
                <Button
                  onClick={handleOpenAdd}
                  size="medium"
                  className={classes.addBtnRoot}
                  startIcon={<AddIcon />}
                >
                  New Catalog
                </Button>
              </div>
            )}
          </div>
          <section className={classes.catalogs} >
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
