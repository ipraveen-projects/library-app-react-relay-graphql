import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute} from "react-router";
import App from "./components/app/App";
import Home from "./components/home/Home";

import AddBook from "./components/add-book/AddBook";
import createBrowserHistory from "history/lib/createBrowserHistory";
import "!style!css!sass!../sass/library-app.scss";

ReactDOM.render(
    <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="home" component={Home}/>
        <Route path="addbook" component={AddBook}/>
    </Route>
</Router>, document.getElementById("app"));
