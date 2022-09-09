import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { EventListProps } from "../types";
import EventList from "../event-list";

const mockData = require("./mock.json");

export default {
  title: "Components/EventList",
  component: EventList,
} as ComponentMeta<typeof EventList>;

const Template: ComponentStory<typeof EventList> = ({ ...args }: any) => {
  const props: EventListProps = {
    run: args.run,
    slideDone: args.slideDone,
    slide: {
      "@id": "test",
    },
    content: {
      bgColor: args.bgColor,
      jsonData: args.jsonData,
    },
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <EventList {...props} />;
};

export const example1 = Template.bind({});

example1.args = {
  run: "test",
  slideDone: () => {},
  slide: {
    "@id": "test",
  },
  bgColor: "#000c2e",
  jsonData: JSON.stringify(mockData),
};
