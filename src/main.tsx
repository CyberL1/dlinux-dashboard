import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import ContainerPage from "./pages/container/index.tsx";
import TerminalPage from "./pages/container/terminal.tsx";

async function loader() {
	const info = await fetch(`https://api.ssh.surf/info`, {
		// @ts-ignore
		headers: { "x-ssh-auth": localStorage.getItem("key") },
	});

	const data = await info.json();
	return data;
}

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <App error />,
		children: [
			{
				path: "/container",
				element: <ContainerPage />,
				loader,
			},
			{
				path: "/container/terminal",
				element: <TerminalPage />,
				loader,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
