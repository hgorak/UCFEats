import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { AuthContextProvider } from "./context/AuthContext.jsx";
import { ItemsContextProvider } from "./context/ItemsContext.jsx";

import "./styles.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthContextProvider>
			<ItemsContextProvider>
				<App />
			</ItemsContextProvider>
		</AuthContextProvider>
	</React.StrictMode>
);
