import React, { FC, useEffect, useState } from "react";
import "./book-byen.scss";
import { ThemeStyles } from "../slide-util-ts";
import GlobalStyles from "../GlobalStyles";
import { BookByenItem, BookByenProps } from "./types";

const formatTime = (date: string | Date): string => {
  return new Date(date).toLocaleTimeString("da-DK", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const filterEvents = (item: BookByenItem): boolean => {
  return item.isDeleted;
};

const formatEvents = (item: any): BookByenItem => {
  return {
    // next line: add/get original objects
    // ...item,
    id: item?.id,
    startTime: formatTime(item?.start),
    endTime: formatTime(item?.end),
    facility: item?.facility?.name,
    activity: item?.activity?.name,
    bookingNote: item?.bookingNote,
    teamName: item?.team?.name,
    // teamleaders is an array, and i dont know whats in it
    teamleaders: item?.team?.teamleaders[0] || "",
    userName: item?.user?.name,
    isDeleted: item.isDeleted,
  };
};

/**
 * BookByen component.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {object} props.content The slide content.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @returns {object} The component.
 */
const BookByen: FC<BookByenProps> = ({ slide, content, slideDone }) => {
  // Content from content
  const {
    bgColor = "#000c2e",
    showDayName,
    logo,
    pageIntervalTime = 10000,
    postsPerPage = 10,
    showTime = false,
    showFacility = false,
    showActivity = false,
    showBookingNote = false,
    showTeam = false,
    showTeamleaders = false,
    showUserName = false,
    jsonData,
  } = content;

  // ADMIN stuff start here
  const rootClasses: string[] = ["template-book-byen"];
  const itemList: any[] = JSON.parse(jsonData);
  const cleanEvents = itemList.map(formatEvents).filter(filterEvents);

  // Makes a watch that is updated live
  const [timeNow, setTimeNow] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeNow(formatTime(new Date()));
    }, 1000);

    return function cleanup() {
      clearInterval(timer);
    };
  }, []);

  // Split elements on pages logic
  const indexOfLastEvent = currentPage * postsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - postsPerPage;
  const currentEvents = cleanEvents.slice(indexOfFirstEvent, indexOfLastEvent);
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

  const PageItems = ({ items }: { items: BookByenItem[] }) => {
    return (
      <>
        {items.map((item) => {
          return (
            <tr
              key={item.id}
              className={`{'is-odd': $odd, 'bookbyen-bookings__body': true}`}
            >
              {showTime && (
                <td className="bookbyen-bookings__time">
                  {item.startTime} - {item.endTime}
                </td>
              )}
              {showFacility && <td>{item.facility}</td>}
              {showActivity && <td>{item.activity}</td>}
              {showBookingNote && <td>{item.bookingNote}</td>}
              {showTeam && <td>{item.teamName}</td>}
              {showTeamleaders && <td>{item.teamleaders}</td>}
              {showUserName && <td>{item.userName}</td>}
            </tr>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="bookbyen kk-ratio-{{ratio}} kk-slide-body font-kbh">
        <div className={rootClasses.join(" ")}>
          <header className="bookbyen-top" style={{ backgroundColor: bgColor }}>
            <div className="bookbyen-top__date">
              {showDayName && (
                <p>
                  {new Date().toLocaleString("da-DK", {
                    weekday: "long",
                    day: "numeric",
                    month: "short",
                  })}
                </p>
              )}
              {timeNow && (
                <div className="bookbyen-top__time">
                  {timeNow?.split(".")[0]}{" "}
                  <span className="bookbyen-top__time-separator">:</span>{" "}
                  {timeNow?.split(".")[1]}
                </div>
              )}
            </div>
            <div className="bookbyen-top__logo">
              {logo && (
                <img src={logo} className="bookbyen-top__logo" alt="Logo" />
              )}
            </div>
          </header>
        </div>
        <div className="bookbyen__subslide">
          <div className="bookbyen__divider">
            <div className="bookbyen__pager" style={{ color: bgColor }}>
              {currentPage} af {totalPages}
            </div>
          </div>
          <table className="bookbyen-bookings">
            <thead>
              <tr
                className="bookbyen-bookings__head"
                style={{ backgroundColor: bgColor }}
              >
                {showTime && <th className="bookbyen-bookings__time">Tid</th>}
                {showFacility && <th>Facilitet</th>}
                {showActivity && <th>Aktivitet</th>}
                {showBookingNote && <th>Note</th>}
                {showTeam && <th>Hold</th>}
                {showTeamleaders && <th>Holdleder</th>}
                {showUserName && (
                  <th className="bookbyen-bookings__username">Brugernavn</th>
                )}
              </tr>
            </thead>
            <tbody>
              <PageItems items={currentEvents} />
            </tbody>
          </table>
        </div>
      </div>
      <ThemeStyles id="template-book-byen" css={slide?.themeData?.css} />
      <GlobalStyles />
    </>
  );
};

export default BookByen;