import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import BoardView from "../../components/dnd/BoardView";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import { Button, IconButton, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
// redux actions
import { getBoard } from "../../store/actions/board";
import TabIcon from "@mui/icons-material/Tab";
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
    borderRadius: "5px"
  },
  addBtnRoot: {
    border: "none",
    fontWeight: "bold !important",
    paddingRight: "10px !important",
    textTransform: "none !important",
    color: "white !important",
    borderRadius: "0px 8px 8px !important",
    backgroundColor: "#0089d9 !important",
  },
  boardName: {
    padding: "20px 0px 20px 20px",
    // textAlign: "center",
    // color: "#001352",

    color: "#fff",
    backgroundColor: "#265077 !important",
  },
  infoTopCorner: {
    padding: "0px 0px 20px 40px",
    color: "#353147",
  },
  catalogs: {
    marginLeft: 40,
  },
  TabIcon: {
    color: "#ffffff",
    fontSize: "medium",
  },
  addIcon: {
    marginRight: "-5px"
  }
});

const Board = (props) => {
  const { board } = props;
  const classes = useStyles();
  const boardId = window.location.pathname.split("/")[2];

  // states
  const [isAdding, setIsAdding] = useState(false);
  const initialInputState = {
    title: "" + "",
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

  const currentDate = new Date();

  const date = currentDate.getFullYear()
    + '/' + (currentDate.getMonth() + 1) +
    '/' + currentDate.getDate() + ' '
    + currentDate.getHours() + ':'
    + currentDate.getMinutes()
    + ':' + currentDate.getSeconds();

  return (
    <div className={classes.root}>
      {board != null && (
        <div>
          <h2 className={classes.boardName}>
            <Button><TabIcon className={classes.TabIcon} /></Button>
            {board.title}</h2>
          <div className={classes.infoTopCorner}>
            <em>{board.description}</em>
          </div>
          <div>
            <em className={classes.infoTopCorner}>Created at: {date}</em>
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
                  <Button size="small" className={classes.addBtnRoot} onClick={handleSubmit}>
                    CREATE
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
                  size="small"
                  className={classes.addBtnRoot}
                  startIcon={<AddIcon className={classes.addIcon}/>}
                >
                  NEW CATALOG
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
