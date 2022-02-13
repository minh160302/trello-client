import { Button, IconButton, TextField, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import BoardCard from "../../components/card/BoardCard";
import { getWorkspace } from "../../store/actions/workspace";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { createBoard } from "../../store/actions/board";
import { GpsFixedTwoTone, ImportantDevices } from "@mui/icons-material";

const useStyles = makeStyles({
  root: {
    marginTop: -20,
    height: "100vh",
    overflowY: "auto",
    background: 'linear-gradient(45deg, #265077 ,#022140 )',
    // backgroundColor:"#022140 !important",
    postion: "fixed",
  },
  boardContainer: {
    Height: "500px",
    width: "28%",
    margin: "20px 20px 20px 40px",
  },
  addTextArea: {
    margin: "10px 0px !important",
    padding: "-20px !important",
    borderRadius: "5px",
    backgroundColor: "#b0cbe5 !important",
  },
  addBtnRoot: {
    color: "white !important",
    borderRadius: "0px 8px 8px !important",
    fontWeight: 'bold !important',
    backgroundColor: "#0ca89b !important",
    margin: "20px 0px 20px 0px !important",
  },
  spaceName: {
    padding: "20px 0px 20px 10px",
    color: "white",
  },
  yourBoard: {
    margin: "0px 0px 20px 40px",
    color: "white",
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
  }

  return (
    <div className={classes.root}>
      {status === 200 && (
        <div>
          <h2 className={classes.spaceName}>
            <Button><HomeOutlinedIcon /></Button>
            {workspace.email}'s WORKSPACE
          </h2>
          <section>
            <h4 className={classes.yourBoard}>YOUR BOARDS</h4>
            <div>
              {workspace.boards.map((board, key) => (
                <div style={{ float: "left" }} key={key} className={classes.boardContainer}>
                  <BoardCard board={board} />
                </div>
              ))}
            </div>
            <div className={classes.boardContainer}>
              {isAdding === true ? (
                <div>
                  <TextField
                    id="outlined-multiline-static"
                    // className={classes.addTextArea}
                    fullWidth
                    placeholder="Board title"
                    name="title"
                    onChange={handleChange}
                    focused
                    classes={{
                      root: classes.addTextArea,
                    }}
                    color="primary"
                  />
                  <TextField
                    id="outlined-multiline-static"
                    className={classes.addTextArea}
                    fullWidth
                    placeholder="Description"
                    name="description"
                    onChange={handleChange}
                  />
                  <Button
                    size="small"
                    onClick={handleSubmit}
                    className={classes.addBtnRoot}
                    variant="contained"
                  >
                    CREATE
                  </Button>
                  <IconButton onClick={handleCancel}>
                    <CancelIcon />
                  </IconButton>
                </div>
              ) : (
                <div>
                  <Button
                    size="small"
                    onClick={handleOpenAdd}
                    className={classes.addBtnRoot}
                    variant="contained"
                    startIcon={<AddIcon />}
                  >
                    NEW BOARD
                  </Button>
                </div>
              )}
            </div>
          </section>
        </div >
      )}
    </div >
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
