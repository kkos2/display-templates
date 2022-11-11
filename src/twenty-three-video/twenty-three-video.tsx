import React, { FC, useEffect, useState } from "react";
import { ThemeStyles } from "../slide-util-ts";
import GlobalStyles from "../GlobalStyles";
import { TwentyThreeVideoProps } from "./types";

const isIFrame = (input: HTMLElement | null): input is HTMLIFrameElement =>
  input !== null && input.tagName === "IFRAME";

/**
 * TwentyThreeVideo component.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {object} props.content The slide content.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @returns {object} The component.
 */
const TwentyThreeVideo: FC<TwentyThreeVideoProps> = ({
  slide,
  content,
  slideDone,
}) => {
  const iframeId = slide["@id"];

  // TODO: This has to be dynamic
  const videoUrl = "video.kk.dk";

  // Content from content
  const {
    autoPlay = true,
    showTray = false,
    mutedAutoPlay = true,
    autoMute = false,
    jsonData,
  } = content;

  // change boolean to number
  const convertedAutoplay = autoPlay === true ? "1" : "0";
  const convertedShowtray = showTray === true ? "1" : "0";
  const convertedMutedAutoPlay = mutedAutoPlay === true ? "1" : "0";
  const convertedAutoMute = autoMute === true ? "1" : "0";
  let videoList: any[] = [];
  try {
    videoList = JSON.parse(jsonData);
  } catch (e) {
    slideDone(slide);
  }

  // When index is null, it means that we need to reset the index to 0 and
  // start playing the list of videos all over again.
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number | null>(0);

  /**
   * Callback for when video has ended.
   *
   * @param {MessageEvent} e The message event.
   */
  function videoEndedEvent(e: MessageEvent) {
    // This will never happen, but need to make typescript happy.
    if (currentVideoIndex === null) {
      return;
    }
    // EventListener function for player:video:ended message
    if (e.data.includes("player:video:ended")) {
      // check if there is a next video id in formatted Video List
      if (videoList[currentVideoIndex + 1] === undefined) {
        setCurrentVideoIndex(null);
        slideDone(slide);
        return;
      }
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  }

  useEffect(() => {
    window.addEventListener("message", videoEndedEvent, false);

    // This activate player:video:ended message
    setTimeout(() => {
      const element = document.getElementById(iframeId);
      if (isIFrame(element) && element.contentWindow) {
        element.contentWindow.postMessage(
          JSON.stringify({
            f: "bind",
            args: ["player:video:ended"],
          }),
          "*"
        );
      }
    }, 1000);

    return function cleanup() {
      window.removeEventListener("message", videoEndedEvent);
    };
  }, [currentVideoIndex]);

  // Use null to reset the loop of videos. We need to do it with setTimeout for
  // the special case that we only display one video and need React to render
  // the slide without video, so it can re-render with the same video which
  // will trigger the video to start playing.
  if (currentVideoIndex === null) {
    setTimeout(function callback() {
      setCurrentVideoIndex(0);
    });
  }

  // ADMIN stuff start here
  const rootClasses = ["template-twenty-three-video"];

  // Styling objects
  const rootStyle = {};

  return (
    <>
      <div className={rootClasses.join(" ")} style={rootStyle}>
        {currentVideoIndex !== null && videoList[currentVideoIndex] && (
          <iframe
            id={iframeId}
            src={`https://${videoUrl}/v.ihtml/player.html?source=site&photo%5fid=${videoList[currentVideoIndex]}&showDescriptions=0&hideBigPlay=1&showLogo=0&socialSharing=0&showBrowse=0&autoPlay=${convertedAutoplay}&showTray=${convertedShowtray}&mutedAutoPlay=${convertedMutedAutoPlay}&autoMute=${convertedAutoMute}`}
            title="video"
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
            frameBorder={0}
            scrolling="no"
            allowFullScreen
            allow="autoplay; fullscreen"
          />
        )}
      </div>
      <ThemeStyles
        id="template-twenty-three-video"
        css={slide?.themeData?.css}
      />
      <GlobalStyles />
    </>
  );
};

export default TwentyThreeVideo;
