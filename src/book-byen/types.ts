import { SlideBaseProp } from "../types/SlideBaseProp";

export interface BookByenItem {
  id: number;
  isDeleted: boolean;
  startTime: string;
  endTime: string;
  facility: string;
  activity: string;
  bookingNote: string;
  teamName: string;
  teamleaders: string;
  userName: string;
}

/** Interface for the content attribute on the props for BookByen component. */
export interface BookByenContent {
  // Header content.
  header: string;
  // Color hex code.
  bgColor: string;
  // Url to logo.
  logo: string;
  // Time in ms before slide goes to next page.
  pageIntervalTime: number;
  postsPerPage: number;
  // Various feature flags below, controlling appearance of slide.
  showDayName: boolean;
  showFacility: boolean;
  showActivity: boolean;
  showBookingNote: boolean;
  showTeam: boolean;
  showWho: boolean;
  maxPosts?: number;
  // List of items to see as JSON string, should be converted to BookByenItem[]
  // It's expected that this data is provided by an external API called
  // bookbyen.
  jsonData: string;
}

export interface BookByenProps extends SlideBaseProp {
  content: BookByenContent;
}
