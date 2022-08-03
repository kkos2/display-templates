import { HTMLAttributes } from "react";

export interface Slide {
  "@id": string;
  themeData?: {
    css?: string;
  };
}

/**
 * In general all props used for slide components share the same requirements.
 *
 * Please note, the content attribute is different for each slide is always an
 * object, but the shape and form differs from slide type to slide type. This is
 * why we use any here, so specific prop definitions can specify how content
 * should look like.
 */
export interface SlideBaseProp extends HTMLAttributes<HTMLDivElement> {
  run: string;
  // Function called when the slide is done and should replaced by a new slide.
  slideDone(slide?: Slide): void;
  slide: Slide;
  content: any;
}
