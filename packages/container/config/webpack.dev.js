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
    publicPath: "http://localhost:8080/",
  },
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "/index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      // this is the path for accessing the specific application 
      // eg: for marketing after triggering this path it search for remoteentry.js inside webpack of marketing app thanit render the specific application content
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
        auth:'auth@http://localhost:8082/remoteEntry.js',
        dashboard:'dashboard@http://localhost:8083/remoteEntry.js',

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
