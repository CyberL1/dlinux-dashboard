import { Button, Paper, TextField } from "@mui/material";
import { FormEvent } from "react";

export default function Login() {
	async function onSubmit(e: FormEvent) {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		const data = Object.fromEntries(formData);

		const hello = await fetch(`https://api.ssh.surf/hello`, {
			headers: { "x-ssh-auth": data.key },
		});

		const json = await hello.json();

		if (json.message.startsWith("Hello")) {
			localStorage.setItem("key", data.key.toString());
			location.reload();
		}
	}

	return (
		<Paper
			component="form"
			autoComplete="off"
			onSubmit={onSubmit}
			sx={{
				display: "flex",
				flexDirection: "column",
				margin: "auto",
				width: 300,
				height: 95,
			}}
		>
			<TextField label="API Key" type="password" name="key" variant="filled" />
			<Button type="submit">Log in</Button>
		</Paper>
	);
}
