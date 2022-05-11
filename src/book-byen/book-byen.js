import React, { useEffect, useState } from "react";
import "./book-byen.scss";
import { ThemeStyles } from "../slide-util";
import GlobalStyles from "../GlobalStyles";

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' })
}

const filterEvents = (item) => {
  return item?.isDeleted !== true
}

const formatEvents = (item) => {
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
    userName: item?.user?.name

  };
}

/**
 * BookByen component.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {object} props.content The slide content.
 * @param {boolean} props.run Whether or not the slide should start running.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @returns {object} The component.
 */
function BookByen({ slide, content = {}, run, slideDone }) {
  // Content from content
  const {
    bgColor = "#000c2e",
    showDayName,
    subslides = [],
    logo,
    pageIntervalTime = 10000,
    showTime = true,
    showFacility = true,
    showActivity = true,
    showBookingNote = true,
    showTeam = true,
    showTeamleaders = false,
    showUserName = true,
  } = content;

  // ADMIN stuff start here
  const rootClasses = ["template-book-byen"];

  // Styling objects
  const rootStyle = {};

  // remove delete events and clean data
  const cleanEvents = subslides.filter(filterEvents).map(formatEvents)

  // Makes a watch that is updated live
  const [timeNow, setTimeNow] = useState(null)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeNow(formatTime(new Date()))
    }, 1000);

    return function cleanup() {
      clearInterval(timer)
    }

  }, [])

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(null)

  // Set total pages
  useEffect(() => {
    setTotalPages(Math.ceil(cleanEvents.length / postsPerPage))
  }, [cleanEvents, postsPerPage])

  // Split elements on pages logic
  const indexOfLastEvent = currentPage * postsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - postsPerPage;
  const currentEvents = cleanEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  // loop across the pages and switch to the next slide after the last page is show
  useEffect(() => {
    if (!totalPages) {
      return
    }

    if (currentPage >= totalPages) {
      console.log("next slide");
      slideDone(slide)
      return
    }

    const pageInterval = setInterval(() => {
      console.log("change page");
      setCurrentPage(currentPage + 1)
    }, pageIntervalTime);

    return function cleanup() {
      console.log("clearInterval");
      clearInterval(pageInterval)
    }
  }, [currentPage, totalPages])


  const PageItems = ({ items = [] }) => {
    return (
      <>
        {items.map(item => {
          return (
            <tr key={item.id} className={`{'is-odd': $odd, 'bookbyen-bookings__body': true}`}>
              {showTime && (
                <td className="bookbyen-bookings__time">
                  {item.startTime} - {item.endTime}
                </td>
              )}
              {showFacility && (
                <td>{item.facility}</td>
              )}
              {showActivity && (
                <td>{item.activity}</td>
              )}
              {showBookingNote && (
                <td>{item.bookingNote}</td>
              )}
              {showTeam && (
                <td>{item.teamName}</td>
              )}
              {showTeamleaders && (
                <td>{item.teamleaders}</td>
              )}
              {showUserName && (
                <td>{item.userName}</td>
              )}
            </tr>
          )
        })}
      </>
    )
  }

  return (
    <>
      <div className="bookbyen kk-ratio-{{ratio}} kk-slide-body font-kbh">
        <div className={rootClasses.join(" ")} style={rootStyle}>
          <header
            className="bookbyen-top"
            style={{ backgroundColor: bgColor }}
          >
            <div className="bookbyen-top__date">
              {showDayName && (
                <p>{new Date().toLocaleString("da-DK", { weekday: 'long', day: 'numeric', month: 'short' })}</p>
              )}
              <div className="bookbyen-top__time">
                {timeNow?.split(".")[0]} <span className="bookbyen-top__time-separator">:</span> {timeNow?.split(".")[1]}
              </div>
            </div>
            <div className="{{placeClass}}">
              {true && <div className="bookbyen-top__place__item bookbyen-top__place-name">
                ikSlide.options.place
              </div>}
              {false && (
                <div className="bookbyen-top__place__item bookbyen-top__place-area">
                  ikSlide.options.area
                </div>
              )}
              {false && (
                <div className="bookbyen-top__place__item bookbyen-top__place-facility">
                  ikSlide.options.facility
                </div>
              )}
            </div>
            <div className="bookbyen-top__logo">
              {logo && (
                <img
                  src={logo}
                  className="bookbyen-top__logo"
                  alt="Logo"
                />
              )}
            </div>
          </header>
        </div>
        <div className="bookbyen__subslide">
          <div className="bookbyen__divider">
            <div className="bookbyen__pager"
              style={{ color: bgColor }}>
              {currentPage} af {totalPages}
            </div>
          </div>
          <table className="bookbyen-bookings">
            <thead>
              <tr
                className="bookbyen-bookings__head"
                style={{ backgroundColor: bgColor }}
              >
                {showTime && (<th className="bookbyen-bookings__time">Tid</th>)}
                {showFacility && (<th>Facilitet</th>)}
                {showActivity && (<th>Aktivitet</th>)}
                {showBookingNote && (<th>Note</th>)}
                {showTeam && (<th>Hold</th>)}
                {showTeamleaders && (<th>Holdleder</th>)}
                {showUserName && (<th className="bookbyen-bookings__username">Brugernavn</th>)}
              </tr>
            </thead>
            <tbody>
              <PageItems items={currentEvents} />
            </tbody>
          </table>
        </div>
      </div>
      <ThemeStyles
        name="template-book-byen"
        css={slide?.themeData?.css}
      />
      <GlobalStyles />
    </>
  );
}

export default BookByen;