export interface MyPage {
  meetingDate: boolean;
  meetingLocation: string;
  profileImgUrl: string;
  ticketUUID: string;
  userName: string;
  userRating?: number; // 옵셔널 필드
}

// 서버 응답에서 제공되는 Sort 정보를 위한 인터페이스
interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

// Pageable 객체를 위한 인터페이스
interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

// 전체 응답을 위한 ApiResponse 인터페이스
export interface ApiResponse {
  content: MyPage[];
  pageable: Pageable;
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
