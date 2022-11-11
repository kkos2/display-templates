import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { KkSlideshowProps } from "../types";
import KkSlideshow from "../kk-slideshow";

// See KkSlideshowProps doc for details.
const mockData = require("./mock.json");

export default {
  title: "Components/KkSlideshow",
  component: KkSlideshow,
  argTypes: {
    animations: {
      options: ['random', 'zoom-in-middle', 'zoom-out-middle', 'zoom-in-random', 'zoom-out-random'],
      control: { type: 'select' },
    },
    transitions: {
      options: [null, 'fade'],
      control: { type: 'radio' },
    }
  },
} as ComponentMeta<typeof KkSlideshow>;

const Template: ComponentStory<typeof KkSlideshow> = ({ ...args }: any) => {
  const props: KkSlideshowProps = {
    run: args.run,
    slideDone: args.slideDone,
    slide: {
      "@id": "test",
    },
    content: {
      jsonData: args.jsonData,
      animations: args.animations,
      transitions: args.transitions,
      imageDuration: args.imageDuration,
    },
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <KkSlideshow {...props} />;
};

export const example1 = Template.bind({});

example1.args = {
  run: "test",
  slideDone: () => {},
  slide: {
    "@id": "test",
  },
  imageDuration: 5000,
  animations: "random",
  transitions: null,
  jsonData: JSON.stringify(mockData),
};
