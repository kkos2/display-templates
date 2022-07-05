import "../src/storybook/index.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: {
      horizontal: {
        name: "16/9",
        styles: {
          width: "1280px",
          height: "720px",
        },
      },
    },
  },
};
