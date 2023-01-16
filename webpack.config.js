import path, { resolve as _resolve } from 'path';

export default {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index.ts',
  target: ['node'],
  output: {
    chunkFormat: 'module',
    filename: 'index.js',
    path: path.resolve('dist'),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  experiments: {
    outputModule: true,
  },
};
