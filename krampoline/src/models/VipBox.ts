export interface VipBox {
  vipUUID: string;
  profileImgUrl: string;
  vipNickname: string;
  vipRate: number;
  follow: boolean;
}

export interface ApiResponse {
  content: VipBox[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalPages: number;
}
