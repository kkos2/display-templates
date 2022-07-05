import { HTMLAttributes } from "react";

export interface Slide {
  themeData?: {
    css?: string;
  };
}

export interface SlideBaseProp extends HTMLAttributes<HTMLDivElement> {
  run: string;
  slideDone(slide?: Slide): void;
  slide?: Slide;
  content: any;
}
