import React from "react";
import ReactDOM from "react-dom";
import Relay from "react-relay";
import Todos from "./components/Todos";
import StoreRoute from "./routes/StoreRoute";

import "!style!css!sass!../sass/HelloWorld.scss";

ReactDOM.render(<Relay.RootContainer Component={Todos} route={new StoreRoute()}/>, document.getElementById("app"));
