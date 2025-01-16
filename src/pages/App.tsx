import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
	AppBar,
	Box,
	createTheme,
	Drawer,
	Icon,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ThemeProvider,
	Toolbar,
	Tooltip,
	Typography,
} from "@mui/material";
import * as Icons from "@mui/icons-material";
import { useState } from "react";
import { Link, Outlet } from "react-router";
import ErrorPage from "./Error";
import Login from "../components/Login";

interface Item {
	title: string;
	icon: keyof typeof Icons;
	href: string;
	openInNewTab?: boolean;
}

const sidebarItems: Item[] = [
	{ title: "Info", icon: "Info", href: "/container" },
	{ title: "Terminal", icon: "Terminal", href: "/container/terminal" },
	{ title: "Processes", icon: "Memory", href: "/container/processes" },
];

const drawerWidth = 240;

const darkTheme = createTheme({
	colorSchemes: {
		dark: true,
	},
});

function App({ error }: { error?: boolean }) {
	const [isOpen, setOpen] = useState(false);

	return (
		<ThemeProvider theme={darkTheme}>
			<AppBar
				position="fixed"
				sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
			>
				<Toolbar>
					<IconButton
						onClick={() => setOpen(!isOpen)}
						size="large"
						color="inherit"
						sx={{ mr: 2 }}
					>
						<Icons.Menu />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						DLinux
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				sx={{
					width: isOpen ? drawerWidth : 56,
					"& .MuiDrawer-paper": {
						width: isOpen ? drawerWidth : 56,
						overflowX: "hidden",
						transition: (theme) =>
							theme.transitions.create("width", {
								easing: theme.transitions.easing.sharp,
								duration: theme.transitions.duration.enteringScreen,
							}),
					},
				}}
			>
				<Toolbar />
				<List>
					{sidebarItems.map((item) => (
						<Tooltip title={item.title} placement="left" arrow>
							<ListItem
								key={item.title}
								component={Link}
								to={item.href}
								target={item.openInNewTab ? "_blank" : "_self"}
								disablePadding
							>
								<ListItemButton>
									<ListItemIcon>
										<Icon component={Icons[item.icon]} />
									</ListItemIcon>
									<ListItemText primary={item.title} />
								</ListItemButton>
							</ListItem>
						</Tooltip>
					))}
				</List>
			</Drawer>
			<Toolbar />
			<Box
				component="main"
				sx={{ p: 2, marginLeft: isOpen ? "240px" : "56px" }}
			>
				{error && <ErrorPage />}
				{localStorage.getItem("key") ? <Outlet /> : <Login />}
			</Box>
		</ThemeProvider>
	);
}

export default App;
