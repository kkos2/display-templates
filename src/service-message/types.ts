import { SlideBaseProp } from "../types/SlideBaseProp";

/** Interface for the content attribute on the props for ServiceMessage component. */
export interface ServiceMessageContent {
  // Color hex code.
  bgColor: string;
  displayInstitution: string;
  title: string;
  text: string;
  duration?: number;
}

export interface ServiceMessageProps extends SlideBaseProp {
  content: ServiceMessageContent;
}
