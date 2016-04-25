import React from "react";
import ReactDOM from "react-dom";
import Header from "./Header";

export default class App extends React.Component {
    render() {
        return (
            <div className="lib-app">
                <Header/>
                {this.props.children}
            </div>
        );
    }
}
