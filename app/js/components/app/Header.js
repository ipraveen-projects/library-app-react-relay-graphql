import React from "react";

import {Link} from "react-router";

export default class HelloWorld extends React.Component {

    render() {
        return (
            <div className="header">
                <h1>Library App</h1>
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse">
                            <ul className="nav navbar-nav">
                                <li>
                                    <Link to="/home">Home</Link>
                                </li>
                                <li>
                                    <Link to="/addbook">Add book</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );

    }
}
