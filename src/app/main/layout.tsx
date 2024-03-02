import React from "react";
import LeftSidebar from "@components/Main/LeftSidebar";
import GlobalNavigation from "@components/Main/GlobalNavigation";
import Script from "next/script";
import AuthCheck from "@components/Auth/AuthCheck";
import ReactQueryProvider from "@utils/ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";

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
          <div className="flex-1 w-full overflow-y-auto">
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </div>
          <div className="fixed bottom-0 left-0 right-0">
            <GlobalNavigation />
          </div>
        </div>
      </div>
    </>
  );
}
