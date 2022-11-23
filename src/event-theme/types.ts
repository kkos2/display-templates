import { SlideBaseProp } from "../types/SlideBaseProp";

export interface EventTheme {
  // Url to logo.
  host: string;
  startDate: string;
  endDate: string;
  title: string;
  subTitle: string;
  image: string;
  colorPalette: "farvepar1" | "farvepar2" | "farvepar3";
}

/** Interface for the content attribute on the props for Event component. */
export interface EventThemeContent extends EventTheme {
  duration?: number;
}

export interface EventThemeProps extends SlideBaseProp {
  content: EventThemeContent;
}

export interface EventThemeDetailsProps {
  title: string;
  startDate: string;
  endDate: string;
  subTitle: string;
}
