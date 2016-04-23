import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID
} from "graphql";

import {
    globalIdField,
    toGlobalId,
    connectionDefinitions,
    connectionArgs,
    connectionFromArray
} from "graphql-relay";

import {getBooks} from "./database";

let bookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
            resolve: (obj) =>  toGlobalId("Book",obj.id) + ":" + obj.id
        },
        title: {
            type: GraphQLString
        },
        pubDate: {
            type: GraphQLString
        }
    })
});

const bookConnection = connectionDefinitions({name: "Book", nodeType: bookType});

const libraryType = new GraphQLObjectType({
    name: "Library",
    fields: () => ({
        id : globalIdField("Library"),
        "books": ({
            type: bookConnection.connectionType,
            args: {
                ...connectionArgs,
                query: {type: GraphQLString},
                pubStartDate: {type: GraphQLString},
                pubEndDate: {type: GraphQLString}
            },
            resolve: (_, args) => {
                return connectionFromArray(getBooks(args), args);
            }
        })
    })
});

const query = new GraphQLObjectType({
    name: "Query",
    fields: () => ({
        library: {
            type: libraryType,
            resolve: () => ({})
        }
    })
});

const schema = new GraphQLSchema({query});

export default schema;
