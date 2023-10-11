/**
 * @name WebpackConfig
 * @description 后台系统打包配置
 */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const combine = (files) => {
  return (content) => {
    const buffers = files.map((id) => Buffer.concat([fs.readFileSync(path.resolve(id)), Buffer.from(';\n')]));
    buffers.push(content);
    return Buffer.concat(buffers);
  };
};

// 是否為生產環境
const isProduction = process.env.NODE_ENV === 'production';
// 发布目标目录
const releaseDir = path.resolve('dist');
// 是否使用ant.min.js
const useAntdMinJs = process.env.ANTDMIN == 'true';

module.exports = {
  devtool: isProduction ? false : 'source-map',
  name: 'gyroscope',
  mode: isProduction ? 'production' : 'development',
  stats: 'errors-only',
  context: path.resolve(''),
  entry: {
    app: './src/App.tsx',
  },
  output: {
    path: releaseDir,
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: 'auto',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve('node_modules/antd/dist/antd.min.js'),
          to: 'vendor.development.js',
          transform: combine([
            'node_modules/react/umd/react.development.js',
            'node_modules/react-dom/umd/react-dom.development.js',
            'node_modules/dayjs/dayjs.min.js',
          ]),
        },
      ],
    }),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      scriptLoading: 'blocking',
      filename: 'index.html',
      template: path.resolve(useAntdMinJs ? 'build/template/index.html' : 'build/template/index.normal.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
    }),
  ],
  module: {
    rules: [
      {
        // jsx 以及js
        test: /\.(ts|tsx|js|jsx)$/,
        include: [
          path.resolve('src'),
          /antd/
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              comments: true,
              babelrc: false,
              configFile: false,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    'targets': {
                      'chrome': '62',
                      'safari': '11.1',
                    },
                    'corejs': require('core-js/package.json').version,
                  },
                ],
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
              plugins: [
                ['@babel/plugin-proposal-decorators', { 'legacy': true }],
              ],
            },
          },
        ],
      },
      {
        test: /\.(css|scss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        // url类型模块资源访问
        test: new RegExp(`\\.(${[
          'psd', // Image formats
          'png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'ico', 'jpeg', // Image formats
          'm4v', 'mov', 'mp4', 'mpeg', 'mpg', 'webm', // Video formats
          'aac', 'aiff', 'caf', 'm4a', 'mp3', 'wav', // Audio formats
          'pdf', 'avif', // Document formats
          'woff', 'woff2', 'woff', 'woff2', 'eot', 'ttf', // icon font
          'svg',
        ].join('|')})$`),
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 1 * 1024,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  externals: (
    useAntdMinJs
      ?
      {
        'react': 'window.React',
        'react-dom': 'window.ReactDOM',
        'antd': 'window.antd',
      }
      :
      {}
  )
};
