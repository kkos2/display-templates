import { SlideBaseProp } from "../types/SlideBaseProp";

export interface Event {
  // Color hex code.
  bgColor: string;
  // Color hex code.
  textColor?: string;
  // Url to logo.
  host: string;
  startDate: string;
  endDate: string;
  title: string;
  subTitle: string;
  image: string;
}

/** Interface for the content attribute on the props for Event component. */
export interface EventContent extends Event {
  duration?: number;
}

export interface EventProps extends SlideBaseProp {
  content: EventContent;
}

export interface EventDetailsProps {
  title: string;
  subTitle: string;
}
