import React from "react";
import Relay from "react-relay";

class Todos extends React.Component {
    render() {
        return (
            <li>{this.props.todo.title}</li>
        );

    }
}

export default Relay.createContainer(Todos, {
    fragments: {
        todo: () => Relay.QL `
            fragment on Todo{
                title
            }
        `
    }
});
