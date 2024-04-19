import "./assets/styles/index.css";

import { Amplify } from "aws-amplify";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);
