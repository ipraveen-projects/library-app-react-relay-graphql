import React from "react";
import Relay from "react-relay";

class Book extends React.Component {
    render() {
        return (
            <li>{this.props.book.title}</li>
        );

    }
}

export default Relay.createContainer(Book, {
    fragments: {
        book: () => Relay.QL `
            fragment on Book{
                title
            }
        `
    }
});
