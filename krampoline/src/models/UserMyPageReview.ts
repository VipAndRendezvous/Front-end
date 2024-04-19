export interface UserMyPageReview {
  reviewUUID: string;
  ticketUUID: string;
  reviewContent: string;
  reviewRating: 0;
  writerUUID: string;
  writerNickname: string;
  writerImgUrl: string;
  vipNickname: string;
  meetingDate: string;
  meetingLocation: string;
  highestBidAmount: 0;
}

interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: string;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface ApiResponse {
  content: UserMyPageReview[];
  pageable: Pageable[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
