import { SlideBaseProp } from "../types/SlideBaseProp";
import { Event } from "../event/types";

/** Interface for the content attribute on the props for Event component. */
export interface EventListContent {
  // Color hex code.
  bgColor: string;
  jsonData: string;
  pageIntervalTime?: number;
}

export interface EventListProps extends SlideBaseProp {
  content: EventListContent;
}

export interface EventListItemProps {
  event: Event;
  type: string;
}
