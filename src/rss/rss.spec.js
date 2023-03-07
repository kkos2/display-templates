import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import slides from "../slides";
import RSS from "./rss";

configure({ adapter: new Adapter() });

test("Test that rss loads", () => {
  const slide = slides.find((s) => s.id === "slide4-rss");
  const wrapper = shallow(
    <RSS
      run={new Date().toISOString()}
      slide={slide}
      content={slide.content}
      slideDone={() => {}}
      executionId="1234"
    />
  );

  expect(wrapper.find(".progress").exists()).toBeTruthy();
});
