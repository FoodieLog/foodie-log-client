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
export interface ResetPasswordBody {
  email: string;
  password: string;
}

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
    nickName: string;
    profileImageUrl: string;
    createdAt: Date;
    updateAt: Date;
    feedImages: {
      ImageUrl: string;
    }[];
    content: string;
    likeCount: number;
    replyCount: number;
    share: string;
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
