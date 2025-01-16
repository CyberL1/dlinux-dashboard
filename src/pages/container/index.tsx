import { useLoaderData, useRevalidator } from "react-router";
import { InfoData } from "../../types";
import { Button, ButtonGroup, Paper, Typography } from "@mui/material";
import { useState } from "react";
import ContainerInfo from "../../components/ContainerInfo";

export default function ContainerPage() {
	let container = useLoaderData();
	const revalidator = useRevalidator();
	const [isPowerStateLocked, setPowerStateLocked] = useState<boolean>();

	if (!container.data) {
		return "Container not found";
	}

	container = container.data as InfoData;

	return (
		<Paper square sx={{ padding: 1 }}>
			<Paper sx={{ display: "flex" }} variant="outlined">
				<Typography variant="h6" sx={{ flexGrow: 1 }}>
					State: {container.state.Status}
				</Typography>
				<ButtonGroup>
					<Button
						loading={isPowerStateLocked}
						onClick={async () => {
							await switchPowerState(
								container.state.Status === "running" ? "stop" : "start",
							);
						}}
					>
						Power {container.state.Status === "running" ? "off" : "on"}
					</Button>
					<Button
						onClick={async () => await switchPowerState("restart")}
						loading={isPowerStateLocked}
						disabled={container.state.Status === "exited"}
					>
						Restart
					</Button>
				</ButtonGroup>
			</Paper>
			<ContainerInfo />
		</Paper>
	);

	async function switchPowerState(state: string) {
		setPowerStateLocked(true);

		const res = await fetch(`https://api.ssh.surf/${state}`, {
			// @ts-ignore
			headers: { "x-ssh-auth": localStorage.getItem("key") },
		});

		if (res.ok) {
			setPowerStateLocked(false);
			revalidator.revalidate();
		}
	}
}
