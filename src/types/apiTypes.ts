// 회원가입
export interface ContentBody {
  email: string;
  password: string;
  nickName: string;
  aboutMe?: string;
}

export interface SignUpForm extends ContentBody {
  passwordCheck: string;
}

// 로그인
export interface LogInBody {
  email: string;
  password: string;
}

//비밀번호 재설정
export type ResetPasswordBody = {
  email: string;
  password: string;
};

export interface ResetPasswordForm extends ResetPasswordBody {
  newPasswordCheck: string;
}

export interface ChangePassword {
  [key: string]: string;
}

// FEED
export type FeedData = {
  feed: {
    feedId: number;
    userId : number;
    nickName: string;
    profileImageUrl: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
    feedImages: {
      imageUrl: string;
    }[];
    content: string;
    likeCount: number;
    replyCount: number;
  };
  restaurant: {
    id: number;
    name: string;
    category: string;
    link: string;
    roadAddress: string;
  };
  isFollowed: boolean;
  isLiked: boolean;
};

export type FeedThumbnail = {
  id: number;
  thumbnailUrl: string;
};

export type ShopThumbData = {
  id: number;
  name: string;
  category: string;
  roadAddress: string;
  feedList: FeedThumbnail[];
};

export type UserResponse = {
  id: number;
  nickName: string;
  profileImageUrl: string | null;
  accessToken: string;
};

export type ApiResponse = {
  status: number;
  response: UserResponse;
  error: string | null;
};

// 좋아요한 맛집 리스트
export type LikedMapResponse = {
  status: number;
  response: {
    content: MapItem[];
  };
  error: any;
};
export type MapItem = {
  isLiked: {
    id: number;
    liked: boolean;
  };
  restaurant: {
    category: string;
    id: number;
    link: string;
    mapX: string;
    mapY: string;
    name: string;
    roadAddress: string;
  };
};
