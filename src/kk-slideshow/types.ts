import { SlideBaseProp } from "../types/SlideBaseProp";

/** Interface for the content attribute on the props for Event component. */
export interface KkSlideshowContent {
  jsonData: string;
  imageDuration?: number;
  transitions: string;
  animations: string;
}

export interface KkSlideshowProps extends SlideBaseProp {
  content: KkSlideshowContent;
}

export interface ImageStyle {
  backgroundImage: string;
  animation?: string;
}
