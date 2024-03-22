"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getMyProfile } from "@services/mypage";
import { profileSetting } from "@services/kakao";
import { useUserStore } from "@store/useUserStore";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { TOAST_MESSAGES } from "@constants";
import axios from "axios";
import Button from "@components/Common/Button";
import Haeder from "@components/Common/Header";
import MyProfileImage from "@components/Mypage/MyProfileImage";
import TextArea from "@components/Common/TextArea";

function MyProfileSettings() {
  const [profile, setProfile] = useState({
    nickName: "",
    aboutMe: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [profileImage, setProfileImage] = useState<File>();
  const fileInput = useRef<HTMLInputElement>(null);
  const user = useUserStore((state) => state.user);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const checkMyProfile = async () => {
      try {
        if (user.id) {
          const {
            data: { response },
          } = await getMyProfile(user.id);

          setProfile({
            nickName: response.nickName,
            aboutMe: response.aboutMe,
          });
          setPreviewImage(response.profileImageUrl);
        }
      } catch (error) {
        console.error("마이프로필 실패", error);
      }
    };
    checkMyProfile();
  }, [user.id]);

  const ProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();

    const userData = {
      nickName: profile.nickName,
      aboutMe: profile.aboutMe,
    };

    const blob = new Blob([JSON.stringify(userData)], { type: "application/json" });
    formData.append("content", blob);
    formData.append("file", profileImage as File);

    try {
      await profileSetting(formData);
      router.replace("/main/mypage");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const ERROR_MESSAGE = error.response.data.error.message;
        toast({ description: ERROR_MESSAGE || TOAST_MESSAGES.PROFILE_EDIT_FAILURE });
      }
    }

    setIsLoading(false);
  };

  const pickImageHandler = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const ProfileChangehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 5) {
      toast({ description: "파일 크기가 5MB를 초과합니다." });
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      setProfileImage(file);
      setPreviewImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <section className="sm:max-w-[640px] mx-auto">
      <Haeder title="" back="prePage" />
      <h2 className="text-center">프로필 설정</h2>
      <form id="formElem" className="w-full p-10 h-4/5 flex flex-col space-y-10" method="post" onSubmit={ProfileSubmit}>
        <div className=" flex flex-col items-center justify-center ">
          <div className="relative">
            <div onClick={pickImageHandler} className="w-[110px] h-[110px] rounded-full overflow-hidden cursor-pointer">
              <MyProfileImage
                imageSrc={previewImage}
                imageAlt={`${user.nickName} 프로필 사진`}
                className="w-[110px] h-[110px] rounded-full"
              />
              <Input
                type="file"
                ref={fileInput}
                onChange={ProfileChangehandler}
                className="hidden"
                accept="image/*,audio/*,video/mp4,video/x-m4v,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,.csv"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4 px-2">
          <div className="relative">
            <input
              id="nickName"
              type="text"
              name="nickName"
              value={profile.nickName}
              className={`authInput`}
              onChange={onChangeHandler}
            />
            <label htmlFor="nickName" className={`authLabel`}>
              닉네임<span className="text-red-500">*</span>
            </label>
          </div>

          <div className="relative">
            <TextArea
              id="aboutMe"
              title="자기소개"
              name="aboutMe"
              value={profile.aboutMe}
              onChange={onChangeHandler}
              maxLength={150}
              className="pt-[24px] pl-[14px] placeholder:text-gray-4 border text-[14px] border-gray-2 rounded-lg"
            />
          </div>
        </div>
        <div className="my-10 px-2 flex-end">
          <Button type="submit" variant={"primary"} disabled={isLoading}>
            {isLoading ? "수정 중" : "프로필 설정"}
          </Button>
        </div>
      </form>
    </section>
  );
}

export default MyProfileSettings;
