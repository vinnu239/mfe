const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require('../package.json');

const prodConfig ={
    mode: 'production',
    output: {
        filename :'[name].[contenthash].js',
        // this publicpath will helpful for remoteentry,js file for clear info look the contain prod.js file comments 
        publicPath:'/marketing/latest/',
    },
    plugins:[
        new ModuleFederationPlugin({
            name : 'marketing',
            filename:'remoteEntry.js',
            exposes:{
                './MarketingApp':'./src/bootstrap'
            },
            shared: packageJson.dependencies
        })
    ]
};

module.exports = merge(commonConfig, prodConfig);