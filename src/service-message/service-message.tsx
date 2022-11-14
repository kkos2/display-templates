import React, { FC, useEffect, useRef } from "react";
import "./service-message.scss";
import { ThemeStyles } from "../slide-util-ts";
import GlobalStyles from "../GlobalStyles";
import { ServiceMessageProps } from "./types";
import BaseSlideExecution from "../base-slide-execution";
import "../kk/Font/font.scss";
import { useDimensions } from "../kk/utils/useDimensions";
import Logo from "../kk/Logo/Logo";

/**
 * Service message component.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {boolean} props.run Whether or not the slide should start running.
 * @param {object} props.content The slide content.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @returns {object} The component.
 */
const ServiceMessage: FC<ServiceMessageProps> = ({
  slide,
  run,
  content,
  slideDone,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const dimensions = useDimensions(ref);
  let layout = "horizontal";
  if (dimensions.height > dimensions.width) {
    layout = "vertical";
  }

  // Content from content.
  const { title, text, displayInstitution, duration = 15000 } = content;

  const bgColor = content.bgColor || "#000";

  const rootClasses: string[] = [
    "template-service-message",
    "service-message",
    "font-kbh",
    `layout-${layout}`,
  ];
  const rootStyle: Record<string, string | number> = {
    backgroundColor: bgColor,
    "--width": dimensions.width,
    "--height": dimensions.height,
  };

  /** Setup slide run function. */
  const slideExecution = new BaseSlideExecution(slide, slideDone);
  useEffect(() => {
    if (run) {
      slideExecution.start(duration);
    }

    return function cleanup() {
      slideExecution.stop();
    };
  }, [run]);

  return (
    <>
      <div ref={ref} className={rootClasses.join(" ")} style={rootStyle}>
        <div className="service-message__top">
          <div className="service-message__display-institution">
            {displayInstitution}
          </div>
          <Logo className="service-message__logo" />
        </div>
        <div>
          <div className="service-message__title">{title}</div>
          <div className="service-message__text">{text}</div>
        </div>
        <div></div>
      </div>
      <ThemeStyles id="template-event" css={slide?.themeData?.css} />
      <GlobalStyles />
    </>
  );
};

export default ServiceMessage;
