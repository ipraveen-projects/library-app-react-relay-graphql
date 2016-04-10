import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID
} from "graphql";

import {
    globalIdField,
    connectionDefinitions,
    connectionArgs,
    connectionFromArray
} from "graphql-relay";

import {getTodos} from "./database";

let todoType = new GraphQLObjectType({
    name: "Todo",
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
            resolve: (obj) => obj.id
        },
        title: {
            type: GraphQLString
        }
    })
});

const todoConnection = connectionDefinitions({name: "Todo", nodeType: todoType});

const storeType = new GraphQLObjectType({
    name: "Store",
    fields: () => ({
        id : globalIdField("Store"),
        "todos": ({
            type: todoConnection.connectionType,
            args: connectionArgs,
            resolve: (_, args) => connectionFromArray(getTodos(), args)
        })
    })
});

const query = new GraphQLObjectType({
    name: "Query",
    fields: () => ({
        store: {
            type: storeType,
            resolve: () => ({})
        }
    })
});

const schema = new GraphQLSchema({query});

export default schema;
