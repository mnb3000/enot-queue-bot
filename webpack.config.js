const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  target: 'node',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.mjs', '.js'], // resolve all the modules other than index.ts
  },
  module: {
    rules: [
      {
        use: 'ts-loader',
        test: /\.ts?$/,
      },
      {
        use: 'graphql-tag/loader',
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
      },
    ],
  },
};
