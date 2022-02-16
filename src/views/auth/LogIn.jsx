import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
// redux
import { login } from "../../store/actions/auth";
import { loginService, storeAuthToken } from "../../store/service/auth/users";

const useStyles = makeStyles({
  inputArea: {
    backgroundColor: "#e6f1ff",
    borderRadius: "5px",
    width: "300px",
  },
  title: {
    color: "white",
  },
  submitButton: {
    backgroundColor: "#0ca89b !important",
    fontWeight: "bold !important",
  },
});

function LogIn(props) {
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("AUTH_TOKEN_KEY");
    if (token) {
      navigate("/");
    }
  }, []);

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = (event) => {
    setShowPassword(!showPassword);
  };

  const initialState = {
    username: "",
    password: "",
  };
  const [text, setText] = useState(initialState);

  const handleChange = (event) => {
    setText({
      ...text,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    const res = await loginService(text);
    if (res) {
      const accessToken = await storeAuthToken(res.token);
      if (accessToken.success) {
        navigate("/");
      }
    }
  };

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <div>
          <h1 className={classes.title}>Log In</h1>
        </div>
        <br />
        <div>
          <TextField
            name="username"
            className={classes.inputArea}
            value={text.username}
            // helperText="Please enter your username"
            // label="Username"
            placeholder="Username"
            type="text"
            onChange={handleChange}
          />
        </div>{" "}
        <br />
        <div>
          <TextField
            name="password"
            className={classes.inputArea}
            value={text.password}
            // helperText="Please enter your password"
            // label="Password"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
          />
        </div>{" "}
        <br />
        <div>
          <Button
            className={classes.submitButton}
            onClick={handleSubmit}
            variant="contained"
          >
            Submit
          </Button>
        </div>
      </Grid>
    </div>
  );
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
