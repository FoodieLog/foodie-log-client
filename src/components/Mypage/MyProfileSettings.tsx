"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getMyProfile } from "@services/mypage";
import { profileSetting } from "@services/kakao";
import { useUserStore } from "@store/useUserStore";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import Button from "@components/Common/Button";
import Haeder from "@components/Common/Header";
import MyProfileImage from "@components/Mypage/MyProfileImage";

function MyProfileSettings() {
  const [profile, setProfile] = useState({
    nickName: "",
    aboutMe: "",
  });

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
        console.log("마이프로필 실패", error);
      }
    };
    checkMyProfile();
  }, [user.id]);

  // 프로필 설정 api
  const ProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      toast({ description: "프로필 수정 다시 시도해 주세요." });
    }
  };

  // ref 클릭
  const pickImageHandler = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  // 이미지 파일 입력
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

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <section className="sm:max-w-[640px] mx-auto">
      <Haeder title="프로필 설정" back="prePage" />
      <form
        id="formElem"
        className="w-full p-10 h-4/5  flex flex-col space-y-10"
        method="post"
        onSubmit={ProfileSubmit}
      >
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
          <label>
            <p className="mb-1">
              닉네임(계정아이디)<span className="text-red-500">*</span>
            </p>
            <input
              type="text"
              name="nickName"
              value={profile.nickName}
              className="inputStyles"
              onChange={onChangeHandler}
            />
          </label>
          <label>
            <p className="mb-1">자기소개</p>
            <input
              type="text"
              name="aboutMe"
              value={profile.aboutMe}
              className="inputStyles"
              onChange={onChangeHandler}
            />
          </label>
        </div>
        <div className="my-10 px-2">
          <Button type="submit" variant={"primary"}>
            프로필 설정
          </Button>
        </div>
      </form>
    </section>
  );
}

export default MyProfileSettings;
