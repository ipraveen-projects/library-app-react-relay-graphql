import {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID} from "graphql";

import {
    globalIdField,
    toGlobalId,
    fromGlobalId,
    connectionDefinitions,
    connectionArgs,
    connectionFromArray,
    nodeDefinitions
} from "graphql-relay";

import {getBooks, getBook, getMember} from "./database";

class Library {}
class Member {};

let library = new Library();
let member = new Member();

let {nodeInterface, nodeField} = nodeDefinitions((globalId) => {
    let {type, id} = fromGlobalId(globalId);

    switch (type) {
        case "Library":
            return library;
        case "Member":
            return getMember(id);
        default:
            return null;
    }

}, (obj) => {
    if (obj instanceof Library) {
        return libraryType
    } else if (obj instanceof Member) {
        return memberType;
    }
    return null
});

let bookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
            resolve: (obj) => toGlobalId("Book", obj.id)
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
    interfaces: [nodeInterface],
    fields: () => ({
        id: globalIdField("Library"),
        "books": ({
            type: bookConnection.connectionType,
            args: {
                ...connectionArgs,
                query: {
                    type: GraphQLString
                }
            },
            resolve: (_, args) => {
                return connectionFromArray(getBooks(args), args);
            }
        })
    })
});

const memberType = new GraphQLObjectType({
    name: "Member",
    interfaces: [nodeInterface],
    fields: () => ({
        "id": {
            type: new GraphQLNonNull(GraphQLID),
            resolve: (obj) => toGlobalId("Member", obj.id)
        },
        "name": {
            type: GraphQLString,
            resolve: (obj) => obj.name
        },
        "memberName": {
            type: GraphQLString,
            resolve: (obj) => obj.memberName
        }
    })
});

const query = new GraphQLObjectType({
    name: "Query",
    fields: () => ({
        node: nodeField,
        library: {
            type: libraryType,
            resolve: () => (library)
        },
        member: {
            type: memberType,
            args: {
                memberName: {
                    type: GraphQLString
                }
            },
            resolve: (_, args) => {
                return getMember(args.memberName);
            }
        }
    })
});

const schema = new GraphQLSchema({query});

export default schema;
