import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { InfoData } from "../types";

export default function ContainerInfo() {
	const [info, setInfo] = useState<InfoData>();

	useEffect(() => {
		const updateInfo = async () => {
			const stats = await fetch(`https://api.ssh.surf/info`, {
				// @ts-ignore
				headers: { "x-ssh-auth": localStorage.getItem("key") },
			});

			const { data } = await stats.json();
			setInfo(data);
		};
		updateInfo();
	}, []);

	if (!info) {
		return "Fetching container info...";
	}

	return (
		<>
			<Typography>Hostname: {info.name}</Typography>
			<Typography>Memory: {info.memory}</Typography>
		</>
	);
}
