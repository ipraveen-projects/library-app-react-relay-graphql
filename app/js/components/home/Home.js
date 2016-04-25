import React from "react";
import Relay from "react-relay";
import Books from "../books/Books";
import LibraryRoute from "../../routes/LibraryRoute";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange = (event) => {
        const query = event.target.value;
        this.setState({query});
    }

    render() {
        let {query} = this.state;

        return (
            <div>
                <input type="text" onChange={this.handleChange}/>
                <Relay.RootContainer Component={Books} route={new LibraryRoute({"query": query})}/>
            </div>
        );
    }
}
