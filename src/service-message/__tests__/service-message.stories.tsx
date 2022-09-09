import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ServiceMessage from "../service-message";
import { ServiceMessageProps } from "../types";

export default {
  title: "Components/ServiceMessage",
  component: ServiceMessage,
} as ComponentMeta<typeof ServiceMessage>;

const Template: ComponentStory<typeof ServiceMessage> = ({ ...args }: any) => {
  const props: ServiceMessageProps = {
    run: args.run,
    slideDone: args.slideDone,
    slide: {
      "@id": "test",
    },
    content: {
      bgColor: args.bgColor,
      title: args.title,
      text: args.text,
      displayInstitution: args.displayInstitution,
    },
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ServiceMessage {...props} />;
};

export const example1 = Template.bind({});

example1.args = {
  run: "test",
  slideDone: () => {},
  slide: {
    "@id": "test",
  },
  bgColor: "#ff2026",
  title: "Lukket",
  text: "Vi har desværre stadig lukket pga. tekniske problemer med vores brusere. Vi regner med at åbne igen i morgen. opdatering følger.",
  displayInstitution: "Bellahøj svømmehal informerer",
};
