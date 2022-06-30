import {SlideBaseProp} from "../types/SlideBaseProp";

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
};

export interface BookByenContent {
  bgColor: string;
  showDayName: boolean;
  logo: string;
  pageIntervalTime: number;
  postsPerPage: number;
  showTime: boolean;
  showFacility: boolean;
  showActivity: boolean;
  showBookingNote: boolean;
  showTeam: boolean;
  showTeamleaders: boolean;
  showUserName: boolean;
  jsonData: string;
}

export interface BookByenProps extends SlideBaseProp {
  content: BookByenContent;
}