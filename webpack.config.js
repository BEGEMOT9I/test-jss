const { resolve, join } = require('path')
const webpack = require('webpack')
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const ForkTSCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

const ROOT_PATH = resolve(__dirname, './')
const SRC_PATH = join(ROOT_PATH, 'src')
const TS_CONFIG_PATH = join(ROOT_PATH, 'tsconfig.json')
const OUTPUT_PATH = join(ROOT_PATH, '/public/webpack/development')
const PUBLIC_PATH = '/'

const BABEL_LOADER = {
  loader: 'babel-loader',
  options: {
    babelrc: false,
    cacheDirectory: true,
    presets: [
      [
        '@babel/env',
        {
          loose: false,
          modules: false,
          useBuiltIns: 'usage',
          corejs: '3',
          targets: { browsers: ['> 2%'] }
        }
      ],
      ['@babel/react', { development: true }]
    ],
    plugins: [
      ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: '3',
          helpers: true,
          regenerator: true,
          useESModules: false
        }
      ],
      '@babel/plugin-proposal-optional-chaining',
      '@babel/proposal-class-properties',
      '@babel/transform-spread',
      '@babel/transform-classes',
      '@babel/syntax-dynamic-import',
      'react-hot-loader/babel'
    ]
  }
}
const TS_LOADER = {
  loader: 'ts-loader',
  options: {
    transpileOnly: true,
    happyPackMode: true,
    onlyCompileBundledFiles: true,
    allowTsInNodeModules: true,
    experimentalFileCaching: true,
    configFile: TS_CONFIG_PATH
  }
}

module.exports = {
  mode: 'development',
  devtool: 'inline-cheap-source-map',
  entry: {
    client: [join(SRC_PATH, 'startup/client')]
  },
  output: {
    filename: '[name].[hash].js',
    chunkFilename: `[name].[contenthash].js`,
    hotUpdateChunkFilename: '[id].[hash].hot-update.js',
    hotUpdateMainFilename: '[hash].hot-update.json',
    publicPath: PUBLIC_PATH,
    path: OUTPUT_PATH
  },
  target: 'web',
  performance: { hints: false },
  cache: true,
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    modules: [SRC_PATH, 'node_modules'],
    plugins: [new TSConfigPathsPlugin({ configFile: TS_CONFIG_PATH })],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: join(SRC_PATH, 'index.html'),
      alwaysWriteToDisk: true
    }),
    new ForkTSCheckerWebpackPlugin({
      tsconfig: TS_CONFIG_PATH,
      eslint: true,
      checkSyntacticErrors: true,
      memoryLimit: 2048,
      measureCompilationTime: true
    }),
    new ManifestPlugin({
      publicPath: PUBLIC_PATH,
      writeToFileEmit: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules|bower_compontents)/,
        use: [BABEL_LOADER, TS_LOADER]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_compontents)/,
        use: BABEL_LOADER
      },
      {
        test: /\.(jsx|tsx)$/,
        include: /node_modules/,
        use: ['react-hot-loader/webpack']
      }
    ]
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
    hot: true,
    disableHostCheck: true,
    compress: true,
    publicPath: PUBLIC_PATH,
    stats: {
      colors: true,
      hash: false,
      version: false,
      chunks: false,
      children: false
    }
  }
}
