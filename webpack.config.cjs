const path = require('path');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.ts'),
  },
   target: 'node',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.bundle.cjs',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    extensionAlias: {
      '.js': ['.ts', '.js'],
      '.mjs': ['.mts', '.mjs'],
    },
}
 
};
