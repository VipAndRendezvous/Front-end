interface VipInfo {
  vipUserUUID: string;
  vipProfileImgUrl: string;
  vipNickname: string;
  vipRating: number | null; // vipRating이 null일 수 있으므로, number와 null을 모두 포함
  vipJop: string;
  vipCareer: string;
  vipIntroduce: string;
  progressAuctionList: Auction[];
  receiveReviewList: Review[];
  isFollow: string; // isFollow의 타입이 명확하지 않아 string으로 가정
}

interface Auction {
  profileImgUrl: string;
  vipNickname: string;
  auctionUUID: string;
  createdTime: string;
  currentHighestBidAmount: number;
  bidCount: number;
}

interface Review {
  // Review 객체의 상세 구조는 제공되지 않았으므로, 필요한 속성에 따라 정의해야 함
}
