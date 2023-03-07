import React from "react";
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import slides from "../slides";
import Contacts from "./contacts";

configure({ adapter: new Adapter() });
jest.mock("./person.svg", () => () => <span />);

test("Test that contacts loads", () => {
  const slide = slides.find((s) => s.id === "slide6-contacts");
  const wrapper = mount(
    <Contacts
      run={new Date().toISOString()}
      slide={slide}
      content={slide.content}
      slideDone={() => {}}
      executionId="1234"
    />
  );

  expect(wrapper.find("h1").text()).toEqual("Kontakter");
  expect(
    wrapper.find(".contact-image").get(0).props.style.backgroundImage
  ).toBe('url("/fixtures/images/author.jpg")');
});
