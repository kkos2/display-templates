import { SlideBaseProp } from "../types/SlideBaseProp";

/** Interface for the content attribute on the props for Event component. */
export interface EventContent {
  // Color hex code.
  bgColor: string;
  // Color hex code.
  textColor: string;
  // Url to logo.
  host: string;
  date: string;
  time: string;
  title: string;
  subTitle: string;
  image: string;
  duration?: number;
}

export interface EventProps extends SlideBaseProp {
  content: EventContent;
}

export interface EventDetailsProps {
  title: string;
  subTitle: string;
  date: string;
  time: string;
}
