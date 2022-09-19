import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import BookByen from "../book-byen";
import { BookByenProps } from "../types";

// See BookByenProps doc for details.
const mockData = require("./mock.json");

export default {
  title: "Components/BookByen",
  component: BookByen,
} as ComponentMeta<typeof BookByen>;

const Template: ComponentStory<typeof BookByen> = ({ ...args }: any) => {
  const props: BookByenProps = {
    run: args.run,
    slideDone: args.slideDone,
    slide: {
      "@id": "test",
    },
    content: {
      header: args.header,
      bgColor: args.bgColor,
      showDayName: args.showDayName,
      logo: args.logo,
      pageIntervalTime: args.pageIntervalTime,
      postsPerPage: args.postsPerPage,
      showFacility: args.showFacility,
      showActivity: args.showActivity,
      showBookingNote: args.showBookingNote,
      showTeam: args.showTeam,
      showTeamleaders: args.showTeamleaders,
      showUserName: args.showUserName,
      jsonData: args.jsonData,
    },
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <BookByen {...props} />;
};

export const example1 = Template.bind({});

example1.args = {
  run: "test",
  slideDone: () => {},
  slide: {
    "@id": "test",
  },
  header: "Test",
  bgColor: "#000c2e",
  showDayName: false,
  logo: "https://admin.kkos2display.dk/bundles/kkos2displayintegration/assets/img/kbh-logo.png",
  pageIntervalTime: 15000,
  postsPerPage: 10,
  showFacility: true,
  showActivity: true,
  showBookingNote: false,
  showTeam: false,
  showTeamleaders: false,
  showUserName: true,
  jsonData: JSON.stringify(mockData),
};
