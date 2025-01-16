import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Process } from "../types";

export default function ProcessesTable({ container }: { container: string }) {
	const [processes, setProcesses] = useState<Process[]>([]);

	useEffect(() => {
		const updateProcesses = async () => {
			const processesForTable = [];

			const apiCall = await fetch(
				`https://process-list.syscall.lol/${container}`,
			);
			const processes = await apiCall.json();

			for (const process of processes) {
				const proc: Process = {
					pid: process[1],
					user: process[0],
					command: process[7],
				};

				processesForTable.push(proc);
			}

			setProcesses(processesForTable);
		};

		updateProcesses();
		setInterval(updateProcesses, 3000);
	}, [container]);

	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>PID</TableCell>
						<TableCell>User</TableCell>
						<TableCell>Command</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{processes.map((process) => (
						<TableRow key={process.pid}>
							<TableCell component="th" scope="row">
								{process.pid}
							</TableCell>
							<TableCell>{process.user}</TableCell>
							<TableCell>{process.command}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
