const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require('../package.json');

const devConfig = {
  mode: "development",
  output: {
    // this is for when we run the code in local we will get the 404 becuase the expected main.js file is not loaded 
    //while navigation to that particular path to over come this we are explicitly givin the path
    //the path no and port no must be same
    publicPath: "http://localhost:8081/",
  },
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: "/index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "marketing",
      // for the container remote object we call this remoteentry.js by specific path(see in the container webpack.dev)
      // si it comes here and expose the marketing app by using exposes object
      filename: "remoteEntry.js",
      exposes: {
        "./MarketingApp": "./src/bootstrap",
      },
      // shared :['react','react-dom'],
      shared :packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
