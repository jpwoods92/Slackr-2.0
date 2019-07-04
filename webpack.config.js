const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');

const resolve = file => path.resolve(__dirname, file);
// Paths
const nodeModulesPath = resolve('node_modules');
const buildPath = resolve('.tmp/public/bundle.js');
const mainPath = resolve('assets/src/index.jsx');

// Plugins for webpack

/*
webpack-merge provides a merge function that
concatenates arrays and merges fobjects creating a new object.
If functions are encountered, it will execute them, run the results
through the algorithm,
and then wrap the returned values within a function again.
 */
const merge = require('webpack-merge');

// A webpack plugin to remove/clean your build folder(s).
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';
const config = {
  /*
   *The base directory,
   *an absolute path, for resolving entry points and
   *loaders from configuration.
   */
  context: resolve(''),
  /*
   * the entry object is where webpack looks
   * to start building the bundle.
   * For SPA we use one path.
   */

  entry: [
    'react-hot-loader/patch',
    // For hot style updates
    'webpack/hot/dev-server',
    // The script refreshing the browser on none hot updates
    `webpack-dev-server/client?http://localhost:${process.env.PORT || 8080}`,
    mainPath,
  ],
  output: {
    /**
     * With zero configuration,
     *   clean-webpack-plugin will remove files inside the directory below
     */
    path: buildPath,
    publicPath: '/',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
  mode: process.env.NODE_ENV || 'development',
  /*
   * Create aliases to import or require certain modules more easily. For example,
   * to alias a bunch of commonly used src/ folders:
   */
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.png'],
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'assets/src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [nodeModulesPath],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 12000, // Convert images < 8kb to base64 strings. Bigger files still loaded from path.
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: isDevelopment,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
    ],
  },
};

/*
 *https://webpack.js.org/configuration/devtool/
 * eval is best for debugging. It points to generated code and
 * improves build process.
 */
const dev = {
  // Make sure errors in console map to correct file and line.
  devtool: 'inline-source-map',
  stats: {
    env: true,
  },
  cache: true,
  mode: 'development',
  devServer: {
    contentBase: buildPath,
    // open the browser after server had been started.
    open: true,
    port: process.env.PORT || 8080,
    host: process.env.HOST || 'localhost',
    // Enable gzip compression for everything served
    compress: true,
    hot: true,
    historyApiFallback: {
      rewrites: [{ from: /^\//, to: '/index.html' }],
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};

const prod = {
  // A full SourceMap is emitted as a separate file.
  // It adds a reference comment to the bundle so development tools
  // know where to find it..
  index: 'src/index.html',
  stats: {
    // Add build date and time information
    builtAt: true,
  },
  mode: 'production',
  entry: mainPath,
  output: {
    path: buildPath,
    filename: 'bundle.js',
  },
};

module.exports = merge(config, isDevelopment ? dev : prod);
