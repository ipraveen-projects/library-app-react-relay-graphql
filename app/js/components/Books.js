import React from "react";
import Relay from "react-relay";
import Book from "./Book";


class Books extends React.Component {

    componentWillReceiveProps(nextProps){
        //const {query} = nextProps;
        //console.log("Books: query: ", query);
        //this.props.relay.setVariables({query});
    }
    render() {
        //const {query} = this.props;
        const {books} = this.props.library;


        return (
            <div>

                <ol>
                    {books.edges.map((book) => {
                        book = book.node;
                        return (<Book key={book.id} book={book} />);
                    })}
                </ol>
            </div>
        );
    }
}

export default Relay.createContainer(Books, {
    initialVariables: {
        limit: 99999,
        test: "five"
    },
    fragments: {
        library: () => Relay.QL `
            fragment on Library{
                books(first:$limit,query:$test){
                    edges{
                      node{
                        id,
                        ${Book.getFragment("book")}
                      }
                    }
                  }
            }
        `
    }
});
