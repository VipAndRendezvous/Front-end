export interface Participate {
  vipUserName: string;
  auctionCreatedDate: string;
  bidCount: number;
  currentHighestBidAmount: number;
  profileImgUrl: string;
  auctionUUID: string;
}

export interface Success {
  vipUserName: string;
  meetDate: string;
  basicUserName: string;
  profileImgUrl: string;
  auctionUUID: string;
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
  content: Participate[] | Success[];
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
