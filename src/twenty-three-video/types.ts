import { SlideBaseProp } from "../types/SlideBaseProp";

export interface TwentyThreeVideoContent {
  autoPlay: boolean;
  showTray: boolean;
  mutedAutoPlay: boolean;
  autoMute: boolean;
  jsonData: string;
}

export interface TwentyThreeVideoProps extends SlideBaseProp {
  content: TwentyThreeVideoContent;
}
