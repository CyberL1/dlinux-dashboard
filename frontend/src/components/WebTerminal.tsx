import { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { AttachAddon } from "@xterm/addon-attach";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import { useLoaderData } from "react-router";
import { Container } from "../types";

export default function WebTerminal() {
  const container = useLoaderData() as Container;
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = `Terminal: ${container.name}`;

    if (terminalRef.current) {
      const terminal = new Terminal({ rows: 67 });

      const socket = new WebSocket(
        `ws://127.0.0.1:3000/containers/${container.id}/terminal`,
      );

      const fitAddon = new FitAddon();
      terminal.loadAddon(fitAddon);

      terminal.open(terminalRef.current);
      fitAddon.fit();

      terminal.write("Connecting to the container\r\n");

      socket.onopen = () => {
        const attachAddon = new AttachAddon(socket);
        terminal.loadAddon(attachAddon);

        terminal.clear();
        terminal.focus();

        socket.send(
          JSON.stringify({
            rows: terminal.rows,
            cols: terminal.cols,
          }),
        );
      };

      window.addEventListener("resize", () => {
        fitAddon.fit();
      });

      terminal.onResize(({ rows, cols }) => {
        socket.send(JSON.stringify({ rows, cols }));
      });

      return () => {
        socket.close();
        terminal.dispose();
      };
    }
  }, []);

  return <div ref={terminalRef} style={{ height: "auto" }} />;
}
