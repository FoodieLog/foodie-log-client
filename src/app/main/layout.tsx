import React from "react";
import LeftSidebar from "@components/Common/Navigation/LeftSidebar";
import GlobalNavigation from "@components/Common/Navigation/GlobalNavigation";
import Script from "next/script";
import AuthCheck from "@components/Auth/AuthCheck";
import ReactQueryProvider from "@utils/ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";
import PostFeedButton from "@components/Common/Button/PostFeedButton";

const NEXT_PUBLIC_KAKAO_MAP_API_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;

export default function MainLayout({ children }: { children: React.ReactNode }) {
  if (!NEXT_PUBLIC_KAKAO_MAP_API_KEY) {
    throw new Error("KAKAO MAP API KEY is not defined!");
  }

  return (
    <>
      <AuthCheck />
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services,clusterer&autoload=false`}
        // strategy="beforeInteractive"
        strategy="lazyOnload"
      />

      <div className="flex min-h-screen mx-auto">
        <Toaster />
        <LeftSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 w-full overflow-y-auto overflow-x-hidden">
            <ReactQueryProvider>{children}</ReactQueryProvider>
            <PostFeedButton />
          </div>
          <GlobalNavigation />
        </div>
      </div>
    </>
  );
}
