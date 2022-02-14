import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles({
	inputArea: {
		backgroundColor: "#e6f1ff",
		borderRadius: "5px",
		width: "300px",
	},
	title: {
		color: "white"
	},
	submitButton: {
		backgroundColor: "#0ca89b !important",
		fontWeight: "bold !important"
	}
});
export default function Register() {
	const classes = useStyles();

	const [showPassword, setShowPassword] = useState(false);

	const handleClick = (event) => {
		setShowPassword(!showPassword)
	};

	const [text, setText] = useState({
		email: "",
		username: "",
		password: ""
	});

	const handleChange = (event) => {
		setText({
			...text,
			[event.target.name]: event.target.value
		});
	}

	const handleSubmit = (event) => {
		console.log(text);
	}
	return (
		<div>
			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justifyContent="center"
				style={{ minHeight: '100vh' }}
			>
				<div>
					<h1 className={classes.title}>Register</h1>				</div><br />
				<div>
					<TextField
						name="email"
						className={classes.inputArea}
						value={text.email}
						// helperText="Please enter your password"
						// label="Password"
						placeholder="Email"
						onChange={handleChange}
					/>
				</div> <br />
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
				</div> <br />
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
				</div> <br />
				<div>
					<Button className={classes.submitButton} onClick={handleSubmit} variant="contained">Submit</Button>
				</div>
			</Grid>

		</div>

	);
}