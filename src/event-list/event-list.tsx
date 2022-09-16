import React, { FC, useEffect, useRef, useState } from "react";
import "./event-list.scss";
import { ThemeStyles } from "../slide-util-ts";
import GlobalStyles from "../GlobalStyles";
import Logo from "../kk/Logo/Logo";
import "../kk/Font/font.scss";
import { useDimensions } from "../kk/utils/useDimensions";
import { EventListItemProps, EventListProps } from "./types";
import { Event } from "../event/types";

const EventListItem: FC<EventListItemProps> = ({ event }) => (
  <div className="event-list-item">
    <img src={event.image} alt="" />
    <div className="event-list-item__content">
      <div className="event-list-item__date">{event.startDate}</div>
      <h3 className="event-list-item__title">{event.title}</h3>
      <div className="event-list-item__sub-title">{event.subTitle}</div>
    </div>
  </div>
);

/**
 * Event list component.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {object} props.content The slide content.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @returns {object} The component.
 */
const EventList: FC<EventListProps> = ({ slide, content, slideDone }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const dimensions = useDimensions(ref);
  let layout = "horizontal";
  if (dimensions.height > dimensions.width) {
    layout = "vertical";
  }

  // Content from content.
  const { pageIntervalTime = 15000, jsonData } = content;

  const bgColor = content.bgColor || "#000c2e";

  const rootClasses: string[] = [
    "template-event-list",
    "event-list",
    "font-kbh",
    `layout-${layout}`,
  ];
  const rootStyle: Record<string, string | number> = {
    backgroundColor: bgColor,
    "--width": dimensions.width,
    "--height": dimensions.height,
  };

  // Split elements on pages logic.
  const postsPerPage = 3;
  const cleanEvents: Event[] = JSON.parse(jsonData);
  const indexOfLastEvent = currentPage * postsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - postsPerPage;
  const currentEvents: Event[] = cleanEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );
  const totalPages = Math.ceil(cleanEvents.length / postsPerPage);

  useEffect(() => {
    const pageInterval = setInterval(
      () => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        } else {
          slideDone(slide);
          setCurrentPage(1);
        }
      },
      pageIntervalTime,
      currentPage,
      totalPages
    );

    return function cleanup() {
      clearInterval(pageInterval);
    };
  });

  return (
    <>
      <div ref={ref} className={rootClasses.join(" ")} style={rootStyle}>
        <div className="event-list__items">
          {currentEvents.length &&
            currentEvents.map((event) => <EventListItem event={event} />)}
        </div>
        <Logo className="event-list__logo" />
      </div>
      <ThemeStyles id="template-event-list" css={slide?.themeData?.css} />
      <GlobalStyles />
    </>
  );
};

export default EventList;
