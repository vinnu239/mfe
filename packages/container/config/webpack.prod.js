const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js", // this is format of name that will see in the source file in chrome appendednwith script tag
    // this will be help once we run the cloudfron domain name it try to access the finename (main.0e678.js)
    //but our S3 bucket floder satrts with container and latest than our build files where our main.js is located
    // so that why we are using below param
    publicPath: "/container/latest/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      // this is the path for accessing the specific application
      // eg: for marketing after triggering this path it search for remoteentry.js inside webpack of marketing app thanit render the specific application content
      remotes: {
        marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`,
        auth: `auth@${domain}/auth/latest/remoteEntry.js`,
        dashboard: `dashboard@${domain}/dashboard/latest/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
