import Relay from "react-relay";

export default class StoreRoute extends Relay.Route {
    static routeName = "StoreRoute";
    static queries = {
        store: () => Relay.QL `
            query{
                store
            }
        `
    };
}
