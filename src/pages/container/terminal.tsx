import { useLoaderData } from "react-router";
import { InfoData } from "../../types";
import { Paper, Typography } from "@mui/material";
import WebTerminal from "../../components/WebTerminal";

export default function TerminalPage() {
	let container = useLoaderData();

	if (!container.data) {
		return "Container not found";
	}

	container = container.data as InfoData;

	return (
		<Paper square sx={{ padding: 1 }}>
			<Paper sx={{ display: "flex" }} variant="outlined">
				<Typography variant="h6" sx={{ flexGrow: 1 }}>
					Terminal: {container.name}
				</Typography>
			</Paper>
			<WebTerminal />
		</Paper>
	);
}
