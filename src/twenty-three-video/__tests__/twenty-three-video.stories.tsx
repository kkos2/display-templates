import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TwentyThreeVideoProps } from "../types";
import TwentyThreeVideo from "../twenty-three-video";

// See TwentyThreeVideoProps doc for details.
const mockData = require("./mock.json");

export default {
  title: "Components/TwentyThreeVideo",
  component: TwentyThreeVideo,
} as ComponentMeta<typeof TwentyThreeVideo>;

const Template: ComponentStory<typeof TwentyThreeVideo> = ({
  ...args
}: any) => {
  const props: TwentyThreeVideoProps = {
    run: args.run,
    slideDone: args.slideDone,
    slide: {
      "@id": "test",
    },
    content: {
      autoPlay: args.autoPlay,
      showTray: args.showTray,
      mutedAutoPlay: args.mutedAutoPlay,
      autoMute: args.autoMute,
      jsonData: args.jsonData,
    },
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <TwentyThreeVideo {...props} />;
};

export const example1 = Template.bind({});

example1.args = {
  run: "test",
  slideDone: () => {},
  autoPlay: true,
  showTray: true,
  mutedAutoPlay: true,
  autoMute: true,
  jsonData: JSON.stringify(mockData),
};
