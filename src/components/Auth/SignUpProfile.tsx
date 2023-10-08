"use client";
import React from "react";
import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MdAddPhotoAlternate } from "react-icons/md";
import { signUp, duplicateNickNameCheck } from "@/src/services/auth";
import { profileSetting } from "@/src/services/kakao";
import Image from "next/image";
import Button from "../Common/Button";
import AuthHeader from "../Common/Header/Auth";
import useSignUpStore from "@/src/store/useSignUpStore";
import { useToast } from "@/components/ui/use-toast";

function SignUpProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [availableEmail, setAvailableEmail] = useState(0);
  const [previewImage, setPreviewImage] = useState("/images/userImage.png");
  const [profileImage, setProfileImage] = useState<File>();
  const [profile, setProfile] = useState({
    nickName: "",
    aboutMe: "",
  });
  const params = useSearchParams();
  const code = params.get("code");
  const router = useRouter();
  const user = useSignUpStore((state) => state.user);
  const clearUser = useSignUpStore((state) => state.clearUser);
  const fileInput = useRef<HTMLInputElement>(null);
  const kakaoToken = localStorage.getItem("kakaoToken");
  const { toast } = useToast();

  // 회원가입 api
  const SignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (availableEmail !== 200) {
      toast({ title: "닉네임 오류", description: "유효하지 않는 닉네임입니다.\n닉네임을 다시 입력해 주세요." });
    }
    const formData = new FormData();

    const userData = {
      email: user.email,
      password: user.password,
      nickName: profile.nickName,
      aboutMe: profile.aboutMe,
    };

    const blob = new Blob([JSON.stringify(userData)], { type: "application/json" });
    formData.append("content", blob);
    formData.append("file", profileImage as File);

    await signUp(formData)
      .then((res) => {
        router.replace("/accounts/login");
        toast({ title: "회원 가입", description: "푸디로그에 오신 걸 환영합니다!" });
        clearUser();
        setProfile({
          nickName: "",
          aboutMe: "",
        });
        setPreviewImage("/images/userImage.png");
        setProfileImage(undefined);
      })
      .catch((err) => toast({ description: "회원가입에 실패하였습니다." }));
    setIsLoading(false);
  };

  // 카카오 로그인 시 프로필 설정 api
  const ProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (availableEmail !== 200) {
      toast({ title: "닉네임 오류", description: "유효하지 않는 닉네임입니다.\n닉네임을 다시 입력해 주세요." });
    }
    const formData = new FormData();

    const userData = {
      nickName: profile.nickName,
      aboutMe: profile.aboutMe,
    };

    const blob = new Blob([JSON.stringify(userData)], { type: "application/json" });
    formData.append("content", blob);
    formData.append("file", profileImage as File);

    await profileSetting(formData)
      .then(() => {
        localStorage.removeItem("kakaoToken");
        router.replace("/main/home");
        toast({ title: "회원 가입", description: "푸디로그에 오신 걸 환영합니다!" });
        setProfile({
          nickName: "",
          aboutMe: "",
        });
        setPreviewImage("/images/userImage.png");
        setProfileImage(undefined);
      })
      .catch((err) => toast({ description: "회원가입에 실패하였습니다." }));
    setIsLoading(false);
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
      alert("파일 크기가 5MB를 초과합니다. 5MB 이하의 파일을 선택해주세요.");
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

  const onBlurHandler: React.FocusEventHandler<HTMLInputElement> = async (e) => {
    try {
      const res = await duplicateNickNameCheck(e.target.value);
      setAvailableEmail(res.status);
    } catch (err: any) {
      setAvailableEmail(err.response.status);
    }
  };

  return (
    <form id="formElem" className="auth" method="post" onSubmit={kakaoToken ? ProfileSubmit : SignUpSubmit}>
      <AuthHeader back="preComponent" />
      <div className=" flex flex-col items-center justify-center mb-4">
        <div className="title">
          <h2>프로필설정</h2>
        </div>
        <div className="relative">
          <div
            onClick={pickImageHandler}
            className="flex justify-center items-center w-[150px] h-[150px] border border-gray-400 rounded-full overflow-hidden cursor-pointer"
          >
            <Image src={previewImage} alt="프로필 사진" width={150} height={150} />
            <input
              type="file"
              ref={fileInput}
              onChange={ProfileChangehandler}
              hidden
              accept="image/*,audio/*,video/mp4,video/x-m4v,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,.csv"
            />
          </div>
          <div onClick={pickImageHandler} className="absolute bottom-5 right-0 cursor-pointer">
            <MdAddPhotoAlternate size="2.5rem" className="text-gray-400" />
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-5">
        <label>
          <p className="mb-1">
            닉네임(계정아이디)<span className="text-red-500">*</span>
          </p>
          <input
            type="text"
            name="nickName"
            value={profile.nickName}
            className="inputStyles"
            onBlur={onBlurHandler}
            onChange={onChangeHandler}
          />
          {availableEmail === 200 ? (
            <p className="ok">사용 가능한 닉네임입니다.</p>
          ) : availableEmail === 400 ? (
            <p className="error">한글, 영문대소문자, _만 가능합니다.</p>
          ) : availableEmail === 409 ? (
            <p className="error">이미 사용 중인 닉네임입니다.</p>
          ) : null}
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
      <div className="my-10">
        <Button type="submit" variant={"primary"} disabled={isLoading}>
          {isLoading ? "로딩중..." : kakaoToken ? "프로필 설정" : "가입완료"}
        </Button>
      </div>
    </form>
  );
}

export default SignUpProfile;
