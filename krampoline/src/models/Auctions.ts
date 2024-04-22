export interface Auctions {
  profileImgUrl: string;
  vipNickname: string;
  auctionUUID: string;
  createdTime: string;
  currentHighestBidAmount: number;
  bidCount: number;
  auctionCreatedDate: string;
  vipUserName: string;
}

export interface ApiResponse {
  content: Auctions[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalPages: number;
}
