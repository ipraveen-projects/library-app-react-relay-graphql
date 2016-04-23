import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import Home from "./components/Home";
import Header from "./components/Header";
import AddBook from "./components/AddBook";

import "!style!css!sass!../sass/HelloWorld.scss";


class App extends React.Component {
    render() {
        return (
            <div className="lib-app">
                <Header/>
                {this.props.children || "Welcome to your Inbox"}
            </div>
        );
    }
}

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="home" component={Home}/>
            <Route path="addbook" component={AddBook}/>
            <Route path="*" component={Home}/>
        </Route>
    </Router>, document.getElementById("app"));
