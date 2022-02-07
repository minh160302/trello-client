import { Button, IconButton, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import BoardCard from "../../components/card/BoardCard";
import { getWorkspace } from "../../store/actions/workspace";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import { createBoard } from "../../store/actions/board";

const useStyles = makeStyles({
  root: {
    margin: 30,
  },
  boardContainer: {
    width: "50%",
    margin: "20px auto",
  },
  addTextArea: {
    margin: "10px 0px !important",
  },
  addBtnRoot: {
    border: "none",
    textTransform: "none !important",
    color: "black !important",
  },
});

const Workspace = (props) => {
  const { workspace, status } = props;
  const classes = useStyles();
  // states
  const [isAdding, setIsAdding] = useState(false);
  const initialInputState = {
    title: "",
    description: "",
  };
  const [input, setInput] = useState(initialInputState);

  useEffect(() => {
    props.getWorkspace("email@gmail.com");
  }, [props.renderCreateBoard]);

  // event handlers
  // const handleBoardClick = (id) => {
  //   console.log(id);
  // };

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
      description: input.description,
      workspaceId: workspace.id,
    };
    props.createBoard(data);
    setIsAdding(false);
    setInput(initialInputState);
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  return (
    <div className={classes.root}>
      {status === 200 && (
        <div>
          <h2>{workspace.email}'s workspace</h2>
          <section>
            <h3>Your boards</h3>
            <div>
              {workspace.boards.map((board, key) => (
                <div key={key} className={classes.boardContainer}>
                  <BoardCard board={board} />
                </div>
              ))}
            </div>
            <div className={classes.boardContainer}>
              {isAdding === true ? (
                <div>
                  <TextField
                    id="outlined-multiline-static"
                    className={classes.addTextArea}
                    fullWidth
                    placeholder="Board title"
                    name="title"
                    onChange={handleChange}
                  />
                  <TextField
                    id="outlined-multiline-static"
                    className={classes.addTextArea}
                    fullWidth
                    placeholder="Description"
                    name="description"
                    onChange={handleChange}
                  />
                  <Button onClick={handleSubmit}>Create</Button>
                  <IconButton onClick={handleCancel}>
                    <CancelIcon />
                  </IconButton>
                </div>
              ) : (
                <div>
                  <Button
                    onClick={handleOpenAdd}
                    className={classes.addBtnRoot}
                    startIcon={<AddIcon />}
                  >
                    Create New Board
                  </Button>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ workspace, board }) => ({
  workspace: workspace.workspace.data,
  status: workspace.workspace.status,
  renderCreateBoard: board.renderCreateBoard,
});

const mapDispatchToProps = {
  getWorkspace,
  createBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
