import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Event from "../event";
import { EventProps } from "../types";

export default {
  title: "Components/Event",
  component: Event,
} as ComponentMeta<typeof Event>;

const Template: ComponentStory<typeof Event> = ({ ...args }: any) => {
  const props: EventProps = {
    run: args.run,
    slideDone: args.slideDone,
    slide: {
      "@id": "test",
    },
    content: {
      bgColor: args.bgColor,
      textColor: args.textColor,
      host: args.host,
      startDate: args.startDate,
      endDate: args.endDate,
      title: args.title,
      subTitle: args.subTitle,
      image: args.image,
    },
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Event {...props} />;
};

export const example1 = Template.bind({});

example1.args = {
  run: "test",
  slideDone: () => {},
  slide: {
    "@id": "test",
  },
  bgColor: "#000c2e",
  title: "Nikolaj og Piloterne",
  subTitle: "30 års jubilæum og greatest hits!",
  startDate: "Søndag d. 27. januar kl. 20:00",
  endDate: "Mandag d. 28. januar kl. 22:00",
  host: "Kulturhuset præsenterer",
  image:
    "https://musikevent.dk/wp-content/uploads/2019/01/Nikolaj-Piloterne-5-8-2019.jpg",
};
