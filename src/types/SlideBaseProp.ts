import { HTMLAttributes } from "react";

export interface Slide {
  '@id': string;
  themeData?: {
    css?: string;
  };
}

export interface SlideBaseProp extends HTMLAttributes<HTMLDivElement> {
  run: string;
  slideDone(slide?: Slide): void;
  slide: Slide;
  content: any;
}
