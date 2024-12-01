import { resolve } from "path";
import webpack from "webpack";
import CopyPlugin from "copy-webpack-plugin";

export default {
  entry: "./src/index.js",
  output: {
    path: resolve("lib"),
    filename: "index.js",
    libraryTarget: "commonjs",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["css-loader"],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    new CopyPlugin({
      patterns: ["src/index.d.ts"],
    }),
  ],
  externals: {
    react: "commonjs react",
  },
};
