const transform = require('@formatjs/ts-transformer');
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const devMode = process.env.NODE_ENV !== "production";

const output = devMode
  ? {
      path: path.resolve(__dirname, "./dist"),
      filename: "[name].js",
      clean: true,
    }
  : {
      path: path.resolve(__dirname, "./build"),
      filename: "[name].js",
      libraryTarget: "commonjs",
      clean: true,
    };

const externals = devMode
  ? {}
  : {
      react: "react",
    };

const entry = devMode
  ? {
      examples: path.resolve(__dirname, "./src/index.js"),
    }
  : {
     "book-byen": path.resolve(__dirname, "./src/book-byen/book-byen.tsx"),
     "twenty-three-video": path.resolve(__dirname, "./src/twenty-three-video/twenty-three-video.tsx"),
      "book-review": path.resolve(
        __dirname,
        "./src/book-review/book-review.js"
      ),
      calendar: path.resolve(__dirname, "./src/calendar/calendar.js"),
      contacts: path.resolve(__dirname, "./src/contacts/contacts.js"),
      event: path.resolve(__dirname, "./src/event/event.tsx"),
      "image-text": path.resolve(__dirname, "./src/image-text/image-text.js"),
      poster: path.resolve(__dirname, "./src/poster/poster.js"),
      rss: path.resolve(__dirname, "./src/rss/rss.js"),
      slideshow: path.resolve(__dirname, "./src/slideshow/slideshow.js"),
      "instagram-feed": path.resolve(
        __dirname,
        "./src/instagram-feed/instagram-feed.js"
      ),
      iframe: path.resolve(__dirname, "./src/iframe/iframe.js"),
      "service-message": path.resolve(__dirname, "./src/service-message/service-message.tsx"),
      table: path.resolve(__dirname, "./src/table/table.js"),
      video: path.resolve(__dirname, "./src/video/video.js"),
      travel: path.resolve(__dirname, "./src/travel/travel.js"),
    };

const plugins = devMode
  ? [
      new HtmlWebpackPlugin({
        title: "webpack Examples",
        template: path.resolve(__dirname, "./src/index.html"),
        filename: "index.html",
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "./src/fixtures"),
            to: "fixtures",
          },
          {
            from: path.resolve(__dirname, "./src/themes"),
            to: "themes",
          },
        ],
      }),
    ]
  : [
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "./src/*/*-admin.json"),
            to: "[name][ext]",
            context: path.resolve(__dirname, "src"),
          },
        ],
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "./src/*/*-config.json"),
            to: "[name]-main[ext]",
            context: path.resolve(__dirname, "src"),
            toType: "template",
            transform(content) {
              return content
                .toString()
                .replace(
                  new RegExp(
                    "https://display-templates.local.itkdev.dk/build/",
                    "g"
                  ),
                  "https://raw.githubusercontent.com/kkos2/display-templates/main/build/"
                );
            },
          },
        ],
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "./src/*/*-config.json"),
            to: "[name]-develop[ext]",
            context: path.resolve(__dirname, "src"),
            toType: "template",
            transform(content) {
              return content
                .toString()
                .replace(
                  new RegExp(
                    "https://display-templates.local.itkdev.dk/build/",
                    "g"
                  ),
                  "https://raw.githubusercontent.com/kkos2/display-templates/kk-develop/build/"
                );
            },
          },
        ],
      }),
      new CleanWebpackPlugin({
        protectWebpackAssets: false,
        cleanAfterEveryBuildPatterns: ["*.LICENSE.txt"],
      }),
    ];

module.exports = {
  mode: devMode ? "development" : "production",
  entry,
  output,
  externals,
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(woff)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: "ts-loader",
          options: {
            getCustomTransformers() {
              return {
                before: [
                  transform.transform({
                    overrideIdFn: '[sha512:contenthash:base64:6]',
                  }),
                ],
              }
            },
          }
        }],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  plugins,
  devServer: {
    historyApiFallback: true,
    hot: false,
    contentBase: "/",
    port: 3000,
    host: "0.0.0.0",
    allowedHosts: [
      "0.0.0.0",
      "localhost",
      "display-admin.local.itkdev.dk",
      "display-client.local.itkdev.dk",
      "display-templates.local.itkdev.dk",
    ],
    stats: "minimal",
  },
  optimization: {
    minimize: true,
  },
};
