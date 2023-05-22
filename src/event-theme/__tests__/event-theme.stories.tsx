import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import EventTheme from "../event-theme";
import { EventThemeProps } from "../types";

export default {
  title: "Components/EventTheme",
  component: EventTheme,
  argTypes: {
    colorPalette: {
      options: ["farvepar1", "farvepar2", "farvepar3"],
      control: { type: "select" },
    },
    startDate: {
      control: { type: "text" },
    },
    endDate: {
      control: { type: "text" },
    },
  },
} as ComponentMeta<typeof EventTheme>;

const Template: ComponentStory<typeof EventTheme> = ({ ...args }: any) => {
  const props: EventThemeProps = {
    run: args.run,
    slideDone: args.slideDone,
    slide: {
      "@id": "test",
    },
    content: {
      host: args.host,
      startDate: args.startDate,
      endDate: args.endDate,
      title: args.title,
      subTitle: args.subTitle,
      image: args.image,
      colorPalette: args.colorPalette,
    },
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <EventTheme {...props} />;
};

export const example1 = Template.bind({});

example1.args = {
  run: "test",
  slideDone: () => {},
  slide: {
    "@id": "test",
  },
  title: "Nikolaj og Piloterne",
  subTitle: "30 års jubilæum og greatest hits!",
  startDate: "1. oktober",
  endDate: "30. november",
  host: "Kulturhuset præsenterer",
  image:
    "https://musikevent.dk/wp-content/uploads/2019/01/Nikolaj-Piloterne-5-8-2019.jpg",
  colorPalette: "farvepar1",
};
