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

const formatEvents = (item: any): BookByenItem => {
  return {
    // next line: add/get original objects
    // ...item,
    id: item?.id,
    startTime: formatTime(item?.start),
    endTime: formatTime(item?.end),
    facility: item?.facility?.name,
    activity: item?.activity?.name,
    bookingNote: item?.infoscreenNote,
    teamName: item?.team?.name,
    teamleaders: item?.team?.teamleaders[0]?.name || "",
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
    header,
    bgColor = "#000c2e",
    showDayName,
    logo,
    pageIntervalTime = 10000,
    maxPosts = undefined,
    postsPerPage = 10,
    showFacility = false,
    showActivity = false,
    showBookingNote = false,
    showTeam = false,
    showWho = false,
    jsonData,
  } = content;

  // ADMIN stuff start here
  const rootClasses: string[] = ["template-book-byen"];
  let itemList: any[] = [];
  try {
    itemList = JSON.parse(jsonData);
    if (maxPosts && maxPosts > 0) {
      itemList = itemList.slice(0, maxPosts);
    }
  } catch (e) {
    slideDone(slide);
  }

  const cleanEvents = itemList.map(formatEvents);
  const currentDate = new Date().toLocaleString("da-DK", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });

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
              <td className="bookbyen-bookings__time">
                {item.startTime} - {item.endTime}
              </td>
              {showFacility && <td>{item.facility}</td>}
              {showActivity && <td>{item.activity}</td>}
              {showTeam && <td>{item.teamName}</td>}
              {showWho && (
                <td>{item.teamleaders ? item.teamleaders : item.userName}</td>
              )}
              {showBookingNote && <td>{item.bookingNote}</td>}
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
            <div />
            <div>
              <div className="bookbyen-top__place">
                {header && (
                  <div className="bookbyen-top__place_header">{header}</div>
                )}
              </div>
              <div className="bookbyen-top__date">
                {timeNow && (
                  <div className="bookbyen-top__time">
                    {showDayName && (
                      <>
                        {currentDate.charAt(0).toUpperCase() +
                          currentDate.slice(1)}
                      </>
                    )}{" "}
                    {timeNow?.split(".")[0]}
                    <span className="bookbyen-top__time-separator">:</span>
                    {timeNow?.split(".")[1]}
                  </div>
                )}
              </div>
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
                <th className="bookbyen-bookings__time">Hvornår</th>
                {showFacility && <th>Hvor</th>}
                {showActivity && <th>Hvad</th>}
                {showTeam && <th>Hold</th>}
                {showWho && <th>Hvem</th>}
                {showBookingNote && <th>Note</th>}
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
