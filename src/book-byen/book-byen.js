import React, { useEffect, useState } from "react";
import "./book-byen.scss";
import { ThemeStyles } from "../slide-util";
import GlobalStyles from "../GlobalStyles";

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
    subslides = [],
    isOdd = true,
    logo = "https://admin.kkos2display.dk/bundles/kkos2displayintegration/assets/img/kbh-logo.png"
  } = content;

  // ADMIN stuff start here
  const rootClasses = ["template-book-byen"];

  // Styling objects
  const rootStyle = {};

  // Makes a watch that is updated live
  const [timeNow, setTimeNow] = useState(null)
  useEffect(() => {
    setInterval(() => {
      setTimeNow(new Date().toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' }))
    }, 1000);

  }, [])

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  // Get total pages
  const totalPages = Math.ceil(subslides.length / postsPerPage)

  // Split elements on pages logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = subslides.slice(indexOfFirstPost, indexOfLastPost);



  // loop across the pages and switch to the next slide after the last page is show
  useEffect(() => {
    if (currentPage >= totalPages) {
      console.log("next slide");
      slideDone(slide)
      return
    }

    const intervalID = setInterval(() => {
      console.log("change page");
      setCurrentPage(currentPage + 1)

    }, 10);

    return function cleanup() {
      console.log("clearInterval");
      clearInterval(intervalID)
    }
  }, [currentPage, totalPages])





  const CurrentItems = ({ items = [] }) => {
    return (
      <>
        {items.map(item => {
          //  Format start time on event
          const formattedStartTime = new Date(item?.start).toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' });
          return (
            <tr key={item.id} className={`{'is-odd': $odd, 'bookbyen-bookings__body': true}`}>
              <td className="bookbyen-bookings__time">
                {formattedStartTime}
              </td>
              <td>{item?.facility?.name}</td>
              <td>{item?.activity?.name}</td>
              <td>{item?.bookingNote}</td>
              <td>{item?.team?.name}</td>
              <td>{item?.user?.name}</td>
              {/* TODO: teamleaders is an array */}
              <td>{item?.team?.teamleaders}</td>
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
              <img
                src={logo}
                className="bookbyen-top__logo"
                alt="Logo"
              />
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
                <th className="bookbyen-bookings__time">Tid</th>
                <th>Facilitet</th>
                <th>Aktivitet</th>
                <th>Note</th>
                <th>Hold</th>
                <th>Holdleder</th>
                <th className="bookbyen-bookings__username">Brugernavn</th>
              </tr>
            </thead>
            <tbody>
              <CurrentItems items={currentPosts} />
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


// // Add Hours to Date Object
// function addHours(date, hours) {
//   const newDate = new Date(date);
//   newDate.setHours(newDate.getHours() + hours);
//   return newDate;
// }


// {
//   items?.map(item, index => (
//     <tr key={index} className={`{'is-odd': $odd, 'bookbyen-bookings__body': true}`}>
//       <td className="bookbyen-bookings__time">
//         {formattedStartTime}
//       </td>
//       <td>{item?.facility?.name}</td>
//       <td>{item?.activity?.name}</td>
//       <td>{item?.bookingNote}</td>
//       <td>{item?.team?.name}</td>
//       {/* TODO: teamleaders is an array */}
//       <td>{item?.team?.teamleaders}</td>
//       <td>{item?.user?.name}</td>
//     </tr>
//   ))
// }



// {
//   subslides?.map((item, index) => {
//   Format start time on event
//     const formattedStartTime = new Date(item?.start).toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' });
//   Adds 1 hour to event start time and format it.
//     const convertedDate = addHours(item?.start, 1).toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' })
//   Remove past events
//     if (convertedDate < timeNow) {
//       return null
//     }

//     return (
//       <tr key={index} className={`{'is-odd': $odd, 'bookbyen-bookings__body': true}`}>
//         <td className="bookbyen-bookings__time">
//           {formattedStartTime}
//         </td>
//         <td>{item?.facility?.name}</td>
//         <td>{item?.activity?.name}</td>
//         <td>{item?.bookingNote}</td>
//         <td>{item?.team?.name}</td>
//         {/* TODO: teamleaders is an array */}
//         <td>{item?.team?.teamleaders}</td>
//         <td>{item?.user?.name}</td>
//       </tr>
//     )
//   })
// }