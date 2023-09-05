import React from "react";
import LeftSidebar from "../../components/Main/LeftSidebar";
import Bottombar from "../../components/Main/Bottombar";
import Script from "next/script";
import AuthCheck from "@/src/components/Auth/AuthCheck";
import Providers from "../../utils/Providers";

const NEXT_PUBLIC_KAKAO_MAP_API_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;

export default function MainLayout({ children }: { children: React.ReactNode }) {
  if (!NEXT_PUBLIC_KAKAO_MAP_API_KEY) {
    throw new Error("KAKAO MAP API KEY is not defined!");
  }

  return (
    <>
      {/* <AuthCheck /> */}
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services,clusterer&autoload=false`}
        strategy="beforeInteractive"
      />

      <div className="flex min-h-screen mx-auto">
        <LeftSidebar />
        <div className="flex flex-col flex-1 items-center justify-center overflow-hidden">
          <div className="w-full h-full overflow-y-auto">
            <Providers>{children}</Providers>
          </div>
          <Bottombar />
        </div>
      </div>
    </>
  );
}
