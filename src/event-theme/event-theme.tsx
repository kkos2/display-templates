import React, { FC, useEffect, useRef } from "react";
import "./event-theme.scss";
import { ThemeStyles } from "../slide-util-ts";
import GlobalStyles from "../GlobalStyles";
import { EventThemeDetailsProps, EventThemeProps } from "./types";
import BaseSlideExecution from "../base-slide-execution";
import Logo from "../kk/Logo/Logo";
import "../kk/Font/font.scss";
import { useDimensions } from "../kk/utils/useDimensions";

/**
 * Event theme details component.
 *
 * @param {object} props Props.
 * @param {string} props.title The title.
 * @param {string} props.subTitle The subtitle.
 * @param {string} props.startDate The start date.
 * @param {string} props.endDate The end date.
 * @returns {object} The component.
 */
const EventDetails: FC<EventThemeDetailsProps> = ({
  title,
  subTitle,
  startDate,
  endDate,
}) => {
  return (
    <>
      <div className="event-details">
        <div className="event-details__title">
          <h1>{title}</h1>
        </div>
        <div className="event-details__sub-title">
          <h2>{subTitle}</h2>
        </div>
        <div className="event__date">
          <span>{startDate}{endDate && ' –'}</span>
          {endDate && <span>{endDate}</span>}
        </div>
      </div>
      <div className="event-additional-info">
        <Logo className="event__logo event-top__logo" />
        <p className="event-additional-info__title">
          Se flere af byens mange arrangementer på:
        </p>
        <a className="event-additional-info__link" href="https://brugbyen.nu">Brugbyen.nu</a>
      </div>
    </>
  );
};

/**
 * Event theme component.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {boolean} props.run Whether or not the slide should start running.
 * @param {object} props.content The slide content.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @returns {object} The component.
 */
const EventTheme: FC<EventThemeProps> = ({
  slide,
  run,
  content,
  slideDone,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const dimensions = useDimensions(ref);
  let layout = "vertical";
  const ratio = dimensions.width / dimensions.height;
  // Between 8:9 and 9:8.
  if (ratio < 1.2 && ratio > 0.8) {
    layout = "square";
  } else if (ratio > 1) {
    layout = "horizontal";
  }

  // Content from content.
  const {
    host,
    startDate,
    endDate,
    title,
    subTitle,
    image,
    colorPalette,
    duration = 10000,
  } = content;

  const rootClasses: string[] = [
    "template-event-theme",
    "event-theme",
    "font-kbh",
    `layout-${layout}`,
    colorPalette,
  ];
  const rootStyle: Record<string, string | number> = {
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

  if (layout === "vertical" || layout === "square") {
    return (
      <>
        <div ref={ref} className={rootClasses.join(" ")} style={rootStyle}>
          <div className="event-top__image">
            <img src={image} alt="" />
          </div>
          <div className="event-top">
            <div className="event-top__text">
              <div className="event__host event-top__host">{subTitle}</div>
            </div>
            <EventDetails
              title={title}
              subTitle={host}
              startDate={startDate}
              endDate={endDate}
            />
          </div>
        </div>
        <ThemeStyles id="template-event" css={slide?.themeData?.css} />
        <GlobalStyles />
      </>
    );
  }

  return (
    <>
      <div ref={ref} className={rootClasses.join(" ")} style={rootStyle}>
        <div className="event-info">
          <div className="event-info__top">
            <div className="event-top__text">
              <div className="event__host event-info__host">{subTitle}</div>
            </div>
          </div>
          <EventDetails
            title={title}
            subTitle={host}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
        <div className="event__image">
          <img src={image} alt="" />
        </div>
      </div>
      <ThemeStyles id="template-event" css={slide?.themeData?.css} />
      <GlobalStyles />
    </>
  );
};

export default EventTheme;
