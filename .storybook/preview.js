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
      horizontalSplit: {
        name: "9/8",
        styles: {
          width: "640px",
          height: "720px",
        },
      },
      landscape: {
        name: "9/16",
        styles: {
          width: "720px",
          height: "1280px",
        },
      },
    },
  },
};
