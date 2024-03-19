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
export interface FeedData {
  feed: {
    feedId: number;
    userId: number;
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
  followed: boolean;
  liked: boolean;
}

export type FeedThumbnail = {
  id: number;
  thumbnailUrl: string;
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

//Notification

export interface User {
  id: number;
  nickName: string;
  profileImgUrl: string | null;
}

export interface Feed {
  id: number;
  thumbnail: string;
}

export interface Reply {
  id: number;
  content: string;
  feedId: number;
  thumbnail: string;
}

export interface Notification {
  id: number;
  type: "LIKE" | "FOLLOW" | "REPLY";
  checkFlag: string;
  user: User;
  feed?: Feed;
  reply?: Reply;
  isFollowed?: boolean;
  createdAt: string;
}

export type APIUserSearchResponse = {
  status: number;
  response: {
    content: [
      {
        id: number;
        nickName: string;
        profileImageUrl: string | null;
        aboutMe: string | null;
      }
    ];
  };
  error: any;
};

export type APIFeedResponse = {
  status: number;
  response: {
    content: Content[];
  };
  error: any;
};

export type APISingleFeedResponse = {
  status: number;
  response: {
    content: Content;
  };
  error: any;
};

export type Content = {
  feed: {
    userId: number;
    nickName: string;
    profileImageUrl: string | null;
    feedId: number;
    createdAt: string;
    updatedAt: string;
    feedImages: { imageUrl: string }[];
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
  followed: boolean;
  liked: boolean;
};

export type APIReplyListResponse = {
  status: number;
  response: {
    userId: number;
    nickName: string;
    profileImageUrl: string | null;
    content: string;
    createdAt: string;
    replyList: {
      id: number;
      userId: number;
      nickName: string;
      profileImageUrl: string | null;
      content: string;
      createdAt: string;
    }[];
  };
  error: any;
};

export type APIReplyPostResponse = {
  status: number;
  response: {
    id: number;
    nickName: string;
    content: string;
    profileImageUrl: string | null;
    createdAt: string;
  };
  error: any;
};

export type GetFeedSharedResponse = {
  status: number;
  response: FeedShared;
  error: any;
};

export type FeedShared = {
  nickName: string;
  profileImageUrl: string | null;
  feedId: number;
  createdAt: string;
  updatedAt: string;
  feedImages: {
    imageUrl: string;
  }[];
  restaurant: {
    id: number;
    name: string;
    category: string;
    link: string;
    roadAddress: string;
  };
  content: string;
  likeCount: number;
  replyCount: number;
};
