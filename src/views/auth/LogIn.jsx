import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";


export default function LogIn() {
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
					<h2>Log In</h2>
				</div><br />
				<div>
					<TextField
						name="username"
						value={text.username}
						helperText="Please enter your username"
						type="text"
						label="Username"
						onChange={handleChange}
					/>
				</div> <br />
				<div>
					<TextField
						name="password"
						value={text.password}
						helperText="Please enter your password"
						label="Password"
						type={showPassword ? "text" : "password"}
						onChange={handleChange}						
					/>
				</div> <br />
				<div>
					<Button onClick={handleSubmit} variant="contained">Submit</Button>
				</div>
			</Grid>

		</div>

	);
}