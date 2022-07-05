module.exports = {
  stories: ['../src/**/__tests__/*.stories.tsx'],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  webpackFinal: async (config, { configType }) => {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
    });
    config.resolve.fallback = fallback;
    config.module.rules = config.module.rules.filter(rule => rule.test.source !== "\\.css$");
    config.module.rules.push({
      test: /\.(sa|sc|c)ss$/,
      use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
    });

    return config;
  },
};
