import React, { useEffect, useState } from "react";
import { postFeed } from "@services/post";
import usePostStore, { initialContent } from "@store/usePostStore";
import { useRouter } from "next/navigation";
import Button from "@components/Common/Button";
import useSignUpStore from "@store/useSignUpStore";
import PostSearch from "@components/PostForm/PostSearch";
import FeedImageSlide from "@components/Feed/FeedImageSlide";
import Header from "@components/Common/Header";
import { useToast } from "@/components/ui/use-toast";
import TextArea from "@components/Common/TextArea";
import PostContentShopItem from "@components/PostForm/PostContentShopItem";
import useFeedStore from "@store/useFeedStore";
import { getSingleFeed, updateFeed } from "@services/feed";
import { TOAST_MESSAGES } from "@constants";
import { useUserStore } from "@store/useUserStore";

function PostContent() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const {
    user: { id: userId },
  } = useUserStore();
  const { content, files, previews, setContent, setPreviews } = usePostStore();
  const {
    feed: { id: feedId, content: feedContent },
    setFeed,
  } = useFeedStore();
  const { nextComponent, setNextComponent } = useSignUpStore();
  const { toast } = useToast();

  const registerFeedHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      const feedData = {
        selectedSearchPlace: { ...content },
        content: feedContent,
        isLiked: isChecked,
      };

      const blob = new Blob([JSON.stringify(feedData)], { type: "application/json" });
      formData.append("content", blob);
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
      await postFeed(formData);
      toast(TOAST_MESSAGES.POST_SUCCESS);
      setNextComponent("");
      router.replace("/main/mypage");
    } catch (err) {
      toast(TOAST_MESSAGES.POST_FAILURE);
    }
  };

  const editFeedHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await updateFeed(feedId, feedContent);
      setNextComponent("");
      router.push(`/main/feed/${userId}?feedId=${feedId}`);
      toast(TOAST_MESSAGES.EDIT_POST_SUCCESS);
    } catch (err) {
      toast(TOAST_MESSAGES.EDIT_POST_FAILURE);
    }
  };

  const changeTextHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeed({ id: feedId, content: e.target.value });
  };

  const changeCheckboxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const images = previews.map((item) => {
    return {
      imageUrl: item,
    };
  });

  const getFeedById = async (feedId: number) => {
    const response = await getSingleFeed(feedId);
    const {
      feed,
      restaurant: { id, category, name, roadAddress },
    } = await response.response.content;
    const feedImages = feed.feedImages.map(({ imageUrl }: { imageUrl: string }) => imageUrl);

    const newContent = {
      ...initialContent,
      id,
      place_name: name,
      category_name: category,
      road_address_name: roadAddress,
    };
    setPreviews(feedImages);
    setContent(newContent);
    setFeed({ id: feedId, content: feed.content });
  };

  useEffect(() => {
    if (feedId) {
      getFeedById(feedId);
    }
  }, []);

  if (nextComponent === "PostSearch") {
    return <PostSearch />;
  }

  return (
    <section className="w-full sm:max-w-[640px] mx-auto mb-[10px]">
      <Header title={feedId ? "게시물 수정" : "게시물 작성"} back={feedId ? "prePage" : "preComponent"} />
      <div className="px-5 mt-5">
        <FeedImageSlide images={images} />
        <PostContentShopItem isShowEdit={!!feedId} />
        <TextArea
          value={feedContent}
          onChange={changeTextHandler}
          placeholder="나의 맛집기록을 남겨봐요!"
          maxLength={300}
          className="p-2.5 placeholder:text-gray-4 border border-gray-2 rounded-lg"
        />
        {!feedId && (
          <label className="flex items-center gap-x-2 text-base font-medium text-gray-4 mt-3 mb-[29px]">
            <input
              type="checkbox"
              className="w-4 h-4 border-gray-3"
              checked={isChecked}
              onChange={changeCheckboxHandler}
            />
            <span>나의 맛집 좋아요 리스트에 추가</span>
          </label>
        )}
        <Button type="button" variant="primary" onClick={feedId ? editFeedHandler : registerFeedHandler}>
          업로드
        </Button>
      </div>
    </section>
  );
}

export default PostContent;
