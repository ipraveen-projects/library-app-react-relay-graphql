import React from "react";

import {Link} from "react-router";

export default class HelloWorld extends React.Component {

    render() {
        return (
            <div className="header">
                Starter kit for React with Relay
                <ul className="menu">
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/addbook">Add book</Link>
                    </li>
                </ul>
            </div>
        );

    }
}
