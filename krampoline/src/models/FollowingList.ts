export type FollowingUser = {
  nickname: string;
  profileImgUrl: string;
  userUUID: string;
  followUUID: string;
};

// 만약 이 타입의 배열을 다루는 경우, 예를 들어 API 응답 타입을 정의할 때는 다음과 같이 사용할 수 있습니다.
export type FollowingListResponse = FollowingUser[];
