export interface Slide {
  themeData?: {
    css?: string;
  };
}

export interface SlideBaseProp {
  run: string;
  slideDone(slide?: Slide): void;
  slide?: Slide;
  content: any;
}
