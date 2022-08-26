import React, { FC, useEffect, useRef, useState } from "react";
import "./event.scss";
import { ThemeStyles } from "../slide-util-ts";
import GlobalStyles from "../GlobalStyles";
import { EventDetailsProps, EventProps, Dimensions } from "./types";
import BaseSlideExecution from "../base-slide-execution";
import Logo from "../kk/Logo/Logo";
import "../kk/Font/font.scss";

/**
 * Event details component.
 *
 * @param {object} props Props.
 * @param {object} props.date The date.
 * @param {boolean} props.time The time.
 * @param {object} props.title The title.
 * @param {Function} props.subTitle The subtitle.
 * @returns {object} The component.
 */
const EventDetails: FC<EventDetailsProps> = ({
  date,
  time,
  title,
  subTitle,
}) => {
  return (
    <div className="event-details">
      <div className="event-details__date">
        <span>{date}</span>
        <span>{time}</span>
      </div>
      <div className="event-details__title">
        <h1>{title}</h1>
      </div>
      <div className="event-details__sub-title">
        <h2>{subTitle}</h2>
      </div>
    </div>
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

  const getDimensions = (): Dimensions => ({
    width: ref.current?.offsetWidth || 0,
    height: ref.current?.offsetHeight || 0,
  });

  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (ref.current) {
      handleResize();
    }

    // The resize event will probably never occur in real life, but there's not
    // reason to not support it.
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ref]);

  // Content from content.
  const {
    host,
    date,
    time,
    title,
    subTitle,
    image,
    duration = 15000,
  } = content;

  const bgColor = content.bgColor || "#000c2e";
  const textColor = content.textColor || "#fff";

  let layout = "horizontal";
  if (dimensions.height > dimensions.width) {
    layout = "vertical";
  }

  const rootClasses: string[] = [
    "template-event",
    "event",
    "font-kbh",
    `layout-${layout}`,
  ];
  const rootStyle: Record<string, string | number> = {
    backgroundColor: bgColor,
    color: textColor,
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
            <div>
              <div className="event__host event-top__host">{host}</div>
              <div className="event-top__image">
                <img src={image} alt="" />
              </div>
            </div>
            <Logo className="event__logo event-top__logo" />
          </div>
          <EventDetails
            title={title}
            subTitle={subTitle}
            date={date}
            time={time}
          />
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
            <div className="event__host event-info__host">{host}</div>
            <Logo className="event__logo event-info__logo" />
          </div>
          <EventDetails
            title={title}
            subTitle={subTitle}
            date={date}
            time={time}
          />
        </div>
      </div>
      <ThemeStyles id="template-event" css={slide?.themeData?.css} />
      <GlobalStyles />
    </>
  );
};

export default Event;
