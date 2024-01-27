import "./styles/global.css";
import React from "react";
import ReactDOM from "react-dom/client";

import {router} from "./Routes";
import {RouterProvider} from "@tanstack/react-router";
import {RecoilRoot} from "recoil";
import ApolloWrapper from "@/Context/Apollo";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<RecoilRoot>
			<ApolloWrapper>
				<RouterProvider router={router} />
			</ApolloWrapper>
		</RecoilRoot>
	</React.StrictMode>
);
