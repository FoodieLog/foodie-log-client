import React from "react";

function Line() {
  return (
    <div className="w-full grid grid-cols-3 items-center my-5 space-x-2">
      <div className="h-[0.8px] w-full bg-slate-400" />
      <p className="w-full text-gray-4 text-center text-sm">간편 로그인</p>
      <div className="h-[0.8px] w-full bg-slate-400" />
    </div>
  );
}

export default Line;
