import { SlideBaseProp } from "../types/SlideBaseProp";

export interface TwentyThreeVideoContent {
  autoPlay: boolean;
  showTray: boolean;
  mutedAutoPlay: boolean;
  autoMute: boolean;
  // String representation of JSON array of numbers. It's expected that this
  // data is provided by an external API.
  jsonData: string;
}

export interface TwentyThreeVideoProps extends SlideBaseProp {
  content: TwentyThreeVideoContent;
}
