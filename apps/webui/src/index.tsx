import "./styles/global.css";
import React from "react";
import ReactDOM from "react-dom/client";

import {router} from "./Routes";
import {RouterProvider} from "@tanstack/react-router";
import {RecoilRoot} from "recoil";
import ApolloWrapper from "@/Context/Apollo";


import {ClerkProvider} from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
	throw new Error("Missing Publishable Key")
}


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
			<RecoilRoot>
				<ApolloWrapper>
					<RouterProvider router={router}/>
				</ApolloWrapper>
			</RecoilRoot>
		</ClerkProvider>
	</React.StrictMode>
);
