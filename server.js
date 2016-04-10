import express from "express";
import graphQLHTTP from "express-graphql";
import path from "path";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import schema from "./data/schema";
import webpackConfig from "./webpack.config";

const APP_PORT = 3000;
const GRAPHQL_PORT = 8888;

/*eslint-disable no-console*/

let graphQLServer = express();
graphQLServer.use("/", graphQLHTTP({graphiql: true, pretty: true, schema: schema}));
graphQLServer.listen(GRAPHQL_PORT, () => console.log(`GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`));

const compiler = webpack(webpackConfig);
const app = new WebpackDevServer(compiler, {
    hot: true,
    proxy: {
        "/graphql": `http://localhost:${GRAPHQL_PORT}`
    }
});

// Serve static resources
app.use("/", express.static(path.resolve(__dirname, "dist")));
app.listen(APP_PORT, () => {
    console.log(`App is now running on http://localhost:${APP_PORT}`);
});

/*eslint-enable */
