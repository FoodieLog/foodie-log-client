import React from "react";

function Line() {
  return (
    <div className="w-full flex items-center justify-center my-10 space-x-2">
      <div className="h-[0.8px] w-full bg-slate-400" />
      <span className="w-10 flex-shrink-0 font-semibold text-gray-600 text-center text-sm">또는</span>
      <div className="h-[0.8px] w-full bg-slate-400" />
    </div>
  );
}

export default Line;
