import React, { useState, useEffect } from "react";
// @mui/material
import { makeStyles } from "@mui/styles";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button, IconButton, TextField } from "@mui/material";
import LinearWithValueLabel from "../progress/LinearWithValueLabel";
// @mui/icons-material
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
// redux
import { connect } from "react-redux";
import {
  checkTask,
  updateChecklistTitle,
  addTask,
  deleteTask,
} from "../../store/actions/card";

const useStyles = makeStyles({
  addTextArea: {
    // margin: "0px 5px 5px 30px !important",
    border: "none",
    background: "#fff",
    borderRadius: "10px",
    // width: "500px !important",
    // marginLeft
    marginBottom: "10px !important",
    "&:hover": {
      border: "0px !important",
    },
    "&:focus": {
      border: "none !important",
    },
  },
  checklistTitle: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  checkboxWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

const Checklist = (props) => {
  const classes = useStyles();
  const { checklist } = props;

  const [tasks, setTasks] = React.useState([]);
  const [title, setTitle] = useState("");
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [isAddTask, setIsAddTask] = useState(false);
  const [taskToAdd, setTaskToAdd] = useState("");

  useEffect(() => {
    setTasks(checklist.tasks);
    setTitle(checklist.title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.checklist]);

  // Event handlers
  const handleChange = (index) => {
    props.checkTask({
      id: checklist.id,
      index: index,
    });
  };

  const handleClickEditTitle = () => {
    setIsEditTitle(true);
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleSaveChangeTitle = () => {
    props.updateChecklistTitle({
      title: title,
      id: checklist.id,
    });
    setIsEditTitle(false);
  };

  // Add task
  const handleClickAddTask = () => {
    setIsAddTask(true);
  };

  const handleChangTaskToAdd = (event) => {
    setTaskToAdd(event.target.value);
  };

  const handleSaveTaskToAdd = () => {
    // console.log(taskToAdd);
    props.addTask({
      id: checklist.id,
      title: taskToAdd,
    });
    handleCancelAddTask();
  };

  const handleCancelAddTask = () => {
    setTaskToAdd("");
    setIsAddTask(false);
  };

  const handleDeleteTask = (index) => {
    props.deleteTask({
      id: checklist.id,
      index,
    });
  };

  return (
    <div>
      <FormControl
        sx={{ m: 3 }}
        fullWidth
        component="fieldset"
        variant="standard"
      >
        {isEditTitle === true ? (
          <div>
            <TextField
              id="outlined-multiline-static"
              className={classes.addTextArea}
              fullWidth
              defaultValue={title}
              onChange={handleChangeTitle}
            />
            <Button onClick={handleSaveChangeTitle}>Save</Button>
          </div>
        ) : (
          <FormLabel
            classes={{
              root: classes.checklistTitle,
            }}
            component="legend"
            onClick={handleClickEditTitle}
          >
            {title}
          </FormLabel>
        )}
        <LinearWithValueLabel progress={checklist.progress} />
        <FormGroup>
          {tasks.map((task, key) => (
            <div key={key} className={classes.checkboxWrapper}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={task.status === "DONE"}
                    onChange={() => handleChange(key)}
                  />
                }
                label={task.title}
              />
              <IconButton onClick={() => handleDeleteTask(key)}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        </FormGroup>
      </FormControl>
      {isAddTask === true && (
        <div>
          <TextField
            id="outlined-multiline-static"
            className={classes.addTextArea}
            fullWidth
            value={taskToAdd}
            placeholder="Add a task"
            onChange={handleChangTaskToAdd}
          />
          <div>
            <Button onClick={handleSaveTaskToAdd}>Save</Button>
            <IconButton onClick={handleCancelAddTask}>
              <CancelIcon />
            </IconButton>
          </div>
        </div>
      )}
      <Button onClick={handleClickAddTask}>Add a task</Button>
    </div>
  );
};

// eslint-disable-next-line no-empty-pattern
const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {
  checkTask,
  updateChecklistTitle,
  addTask,
  deleteTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checklist);
