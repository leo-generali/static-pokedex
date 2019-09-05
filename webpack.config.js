const path = require('path');
const glob = require('glob');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g);
  }
}

const pluginPurgeCss = () =>
  new PurgecssPlugin({
    paths: glob.sync('src/**/*', { nodir: true }),
    extractors: [
      {
        extractor: TailwindExtractor,
        extensions: ['njk']
      }
    ]
  });

const isProduction = ({ NODE_ENV }) => NODE_ENV === 'production';

module.exports = (env) => {
  return {
    plugins: [
      new MiniCssExtractPlugin({
        filename: `styles/[name]-${env.NODE_ENV}.css`,
        chunkFilename: '[id].css',
        ignoreOrder: false
      }),
      ...(isProduction(env) ? [pluginPurgeCss()] : [])
    ],

    mode: env.NODE_ENV,

    watch: !isProduction(env),

    entry: {
      main: './src/assets/packs/main.js',
      search: './src/assets/packs/search.js'
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
    },

    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('tailwindcss'),
                  require('autoprefixer'),
                  require('cssnano')({ preset: 'default' })
                ]
              }
            }
          ]
        }
      ]
    }
  };
};
