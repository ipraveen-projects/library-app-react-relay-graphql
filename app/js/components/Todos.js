import React from "react";
import Relay from "react-relay";
import Header from "./Header";
import Todo from "./Todo";

class Todos extends React.Component {
    render() {
        const {todos} = this.props.store;

        return (
            <div className="hello-world">
                <Header/>
                <ol>
                    {todos.edges.map((todo) => {
                        todo = todo.node;
                        return (<Todo key={todo.id} todo={todo} />);
                    })}
                </ol>
            </div>
        );
    }
}

export default Relay.createContainer(Todos, {
    initialVariables: {
        limit: 99999
    },
    fragments: {
        store: () => Relay.QL `
            fragment on Store{
                todos(first:$limit){
                    edges{
                      node{
                        id,
                        ${Todo.getFragment("todo")}
                      }
                    }
                  }
            }
        `
    }
});
