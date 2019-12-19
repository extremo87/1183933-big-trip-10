const path = require(`path`);
const docRoot = path.join(__dirname, `public`);
module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [`style-loader`, `css-loader`],
      },
    ],
  },
  output: {
    filename: `bundle.js`,
    path: docRoot
  },
  devtool: `source-map`,
  devServer: {
    contentBase: docRoot,
    compress: true,
    watchContentBase: true
  }
};
