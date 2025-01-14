import React, { useState, useRef, useEffect, FC } from "react";
import { ThemeStyles } from "../slide-util-ts";
import "../global-styles.css";
import "./kk-slideshow.scss";
import { ImageStyle, KkSlideshowProps } from "./types";

/**
 * Slideshow component.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {object} props.content The slide content.
 * @param {boolean} props.run Whether or not the slide should start running.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @param {string} props.executionId Unique id for the instance.
 * @returns {object} The component.
 */
const KkSlideshow: FC<KkSlideshowProps> = ({
  slide,
  content,
  run,
  slideDone,
  executionId,
}) => {
  const { jsonData, imageDuration = 5000, transitions, animations } = content;
  const [index, setIndex] = useState(0);
  const fadeEnabled = transitions === "fade";
  const fadeDuration = 1000;
  const [fade, setFade] = useState(false);
  let imageUrls: string[] = [];

  const animationName = "animationForImage";
  const [animationIndex, setAnimationIndex] = useState(0);
  const [animationDuration, setAnimationDuration] = useState(
    imageDuration + fadeDuration
  );

  const timeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null);
  const fadeRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  try {
    imageUrls = JSON.parse(jsonData);
    if (!Array.isArray(imageUrls)) {
      imageUrls = [];
    }
  } catch (e) {
    slideDone(slide);
  }

  /**
   * A random function to simplify the code where random is used
   *
   * @param {number} multiplier The multiplier.
   * @returns {number} Random number.
   */
  function random(multiplier: number) {
    return Math.floor(Math.random() * multiplier);
  }

  /**
   * Creates the animation
   *
   * @param {boolean} grow Grow boolean.
   * @param {string} transform The transform.
   * @returns {string} The animation.
   */
  function createAnimation(
    grow: boolean,
    transform: string = "50% 50%"
  ): string {
    const transformOrigin = transform;
    const startSize = grow ? 1 : 1.2;
    const finishSize = grow ? 1.2 : 1;

    return `@keyframes ${animationName} {
      0% {
        transform: scale(${startSize});
        transform-origin: ${transformOrigin};
      }
      5% {
        transform: scale(${startSize});
        transform-origin: ${transformOrigin};
      }
      95% {
        transform: scale(${finishSize});
        transform-origin: ${transformOrigin};
      }
      100% {
        transform: scale(${finishSize});
        transform-origin: ${transformOrigin};
      }
    }`;
  }

  /**
   * Determines which animation should be used
   *
   * @param {string} animationType The animation type.
   * @returns {string} The current animation.
   */
  function getCurrentAnimation(animationType: string): string {
    const animationTypes = [
      "zoom-in-middle",
      "zoom-out-middle",
      "zoom-out-random",
      "zoom-in-random",
    ];

    const randomPercent = `${random(100) + 1}% ${random(100) + 1}%`;

    switch (animationType) {
      case "zoom-in-middle":
        return createAnimation(true);
      case "zoom-out-middle":
        return createAnimation(false);
      case "zoom-in-random":
        return createAnimation(true, randomPercent);
      case "zoom-out-random":
        return createAnimation(false, randomPercent);
      default:
      case "random":
        return getCurrentAnimation(
          animationTypes[random(animationTypes.length)]
        );
    }
  }

  // Setup animation
  useEffect(() => {
    if (animations) {
      // Adds the animation to the stylesheet. because there is an element of random, we cannot have it in the .scss file.
      const styleSheet = document.styleSheets[0];
      styleSheet.insertRule(
        getCurrentAnimation(animations),
        styleSheet.cssRules.length
      );
    }
  }, []);

  // Get image style for the given image url.
  const getImageStyle = (
    imageUrl: string,
    animation: boolean,
    localAnimationDuration: number
  ): ImageStyle => {
    const imageStyle: ImageStyle = {
      backgroundImage: `url(${imageUrl})`,
    };

    if (animation) {
      imageStyle.animation = `${animationName} ${localAnimationDuration}ms`;
    }

    return imageStyle;
  };

  // Setup image progress.
  useEffect(() => {
    if (run) {
      if (imageUrls.length > 0) {
        timeoutRef.current = setTimeout(() => {
          let newIndex = index + 1;
          if (newIndex > imageUrls.length - 1) {
            // No more images to show.
            slideDone(slide);
            newIndex = 0;
          }

          if (fadeEnabled) {
            // Fade to next image.
            setFade(true);
            setAnimationIndex(newIndex);
            setAnimationDuration(imageDuration + fadeDuration * 2);
            fadeRef.current = setTimeout(() => {
              setFade(false);
              setIndex(newIndex);
            }, fadeDuration);
          } else {
            // Change to next.
            setIndex(newIndex);
            setAnimationIndex(newIndex);
            setAnimationDuration(imageDuration);
          }
        }, imageDuration);
      } else {
        // If there are no images in slide, wait for 2s before continuing to avoid crashes.
        setTimeout(() => {
          slideDone(slide);
        }, 2000);
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (fadeRef.current) {
        clearTimeout(fadeRef.current);
      }
    };
  }, [run, index]);

  return (
    <>
      <div className="template-slideshow">
        {imageUrls &&
          imageUrls.map((imageUrl, imageUrlIndex) => {
            const className = "fade-container";
            const current = imageUrlIndex === index;
            const containerStyle: any = {
              opacity: 0,
              zIndex: imageUrls.length - imageUrlIndex,
            };

            if (current) {
              if (fade) {
                // Fade out current slide.
                containerStyle.animation = `fadeOut ${fadeDuration}ms`;
              } else {
                containerStyle.opacity = 1;
              }
            } else if (imageUrlIndex === index + 1) {
              if (fade) {
                // Fade in next slide.
                containerStyle.animation = `fadeIn ${fadeDuration}ms`;
              }
            }

            return (
              <div
                className={className}
                key={imageUrl}
                data-index={imageUrlIndex}
                style={containerStyle}
                data-active={current}
              >
                <div
                  style={getImageStyle(
                    imageUrl,
                    animationIndex === imageUrlIndex,
                    animationDuration
                  )}
                  className="image"
                />
              </div>
            );
          })}
      </div>

      <ThemeStyles id={executionId} css={slide?.themeData?.css} />
    </>
  );
};

export default KkSlideshow;
