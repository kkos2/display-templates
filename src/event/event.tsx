import React, { FC, useEffect, useRef } from "react";
import "./event.scss";
import { ThemeStyles } from "../slide-util-ts";
import GlobalStyles from "../GlobalStyles";
import { EventDetailsProps, EventProps } from "./types";
import BaseSlideExecution from "../base-slide-execution";
import Logo from "../kk/Logo/Logo";
import "../kk/Font/font.scss";
import { useDimensions } from "../kk/utils/useDimensions";

/**
 * Event details component.
 *
 * @param {object} props Props.
 * @param {string} props.title The title.
 * @param {string} props.subTitle The subtitle.
 * @returns {object} The component.
 */
const EventDetails: FC<EventDetailsProps> = ({ title, subTitle }) => {
  return (
    <>
      <div className="event-details">
        <div className="event-details__title">
          <h1>{title}</h1>
        </div>
        <div className="event-details__sub-title">
          <h2>{subTitle}</h2>
        </div>
      </div>
    </>
  );
};

/**
 * Event component.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {boolean} props.run Whether or not the slide should start running.
 * @param {object} props.content The slide content.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @returns {object} The component.
 */
const Event: FC<EventProps> = ({ slide, run, content, slideDone }) => {
  const ref = useRef<HTMLDivElement>(null);

  const dimensions = useDimensions(ref);
  let layout = "horizontal";
  if (dimensions.height / dimensions.width > 0.8) {
    layout = "vertical";
  }

  // Content from content.
  const {
    host,
    startDate,
    endDate,
    title,
    subTitle,
    image,
    duration = 10000,
  } = content;

  const bgColor = content.bgColor || "#000c2e";
  const textColor = content.textColor || "#fff";

  const rootClasses: string[] = [
    "template-event",
    "event",
    "font-kbh",
    `layout-${layout}`,
  ];
  const rootStyle: Record<string, string | number> = {
    backgroundColor: bgColor,
    color: textColor,
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

  if (layout === "vertical") {
    return (
      <>
        <div ref={ref} className={rootClasses.join(" ")} style={rootStyle}>
          <div className="event-top">
            <div className="event-top__text">
              <div className="event__host event-top__host">{host}</div>
              <div className="event__date">
                <span>{startDate}</span>
                {endDate && <span>{endDate}</span>}
              </div>
            </div>
            <Logo className="event__logo event-top__logo" />
          </div>
          <div className="event-top__image">
            <img src={image} alt="" />
          </div>
          <EventDetails title={title} subTitle={subTitle} />
        </div>
        <ThemeStyles id="template-event" css={slide?.themeData?.css} />
        <GlobalStyles />
      </>
    );
  }

  return (
    <>
      <div ref={ref} className={rootClasses.join(" ")} style={rootStyle}>
        <div className="event__image">
          <img src={image} alt="" />
        </div>
        <div className="event-info">
          <div className="event-info__top">
            <div className="event-top__text">
              <div className="event__host event-info__host">{host}</div>
              <div className="event__date">
                <span>{startDate}</span>
                {endDate && <span>{endDate}</span>}
              </div>
            </div>
            <Logo className="event__logo event-info__logo" />
          </div>
          <EventDetails title={title} subTitle={subTitle} />
        </div>
      </div>
      <ThemeStyles id="template-event" css={slide?.themeData?.css} />
      <GlobalStyles />
    </>
  );
};

export default Event;
