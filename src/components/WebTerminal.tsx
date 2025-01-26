import { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { AttachAddon } from "@xterm/addon-attach";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import { useLoaderData } from "react-router";
import { InfoData } from "../types";

export default function WebTerminal() {
	let container = useLoaderData();
	container = container.data as InfoData;

	const terminalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		document.title = `Terminal: ${container.name}`;

		if (terminalRef.current) {
			const terminal = new Terminal({ rows: 67, convertEol: true });

			const socket = new WebSocket(
				`wss://session.ssh.surf?token=${localStorage.getItem("key")?.toString()}`,
			);

			const fitAddon = new FitAddon();
			terminal.loadAddon(fitAddon);

			terminal.open(terminalRef.current);
			fitAddon.fit();

			terminal.write("Connecting to the container\r\n");

			socket.onopen = () => {
				const attachAddon = new AttachAddon(socket, { bidirectional: false });
				terminal.loadAddon(attachAddon);

				terminal.clear();
				terminal.focus();
			};

			let line = "";
			let cursor = 0;
			let busy = false;

			terminal.onData((data) => {
				if (socket.readyState === WebSocket.OPEN) {
					if (busy) {
						return;
					}

					switch (data) {
						case "\r": // Enter
							socket.send(line);

							cursor = 0;
							line = "";
							break;
						case "\x7f": // Backspace
							if (cursor > 0) {
								terminal.write("\b \b");
								if (line.length > 0) {
									line = line.substring(0, line.length - 1);
								}
								cursor--;
							}
							break;
						default:
							// Check if character is printable
							if (data.charCodeAt(0) >= 32 && data.charCodeAt(0) <= 127) {
								cursor++;
								line += data;
								terminal.write(data);
							}
					}
				}
			});

			// window.addEventListener("resize", () => {
			// 	fitAddon.fit();
			// });

			// terminal.onResize(({ rows, cols }) => {
			// 	socket.send(JSON.stringify({ rows, cols }));
			// });

			return () => {
				socket.close();
				terminal.dispose();
			};
		}
	}, [container]);

	return <div ref={terminalRef} style={{ height: "auto" }} />;
}
