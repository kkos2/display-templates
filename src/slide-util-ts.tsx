import React from "react";
import { createGlobalStyle } from "styled-components";

/**
 * Create a theme style for a slide.
 *
 * @param {object} props Props.
 * @param {string} props.id Slide execution id.
 * @param {string | null} props.css Css as a string.
 * @returns {object} The component.
 */
function ThemeStyles({ id, css }: { id: string; css?: string }): JSX.Element {
  if (!css) {
    return <></>;
  }
  const slideCss = css.replaceAll("#SLIDE_ID", `#${id}`);

  const ThemeComponent = createGlobalStyle`${slideCss}`;
  return <ThemeComponent />;
}

ThemeStyles.defaultProps = {
  css: null,
};

export { ThemeStyles };
