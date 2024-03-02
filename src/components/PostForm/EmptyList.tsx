import React from "react";
import { Dissatisfied } from "@assets/icons";

interface EmptyListProps {
  keyword: string;
}

function EmptyList({ keyword }: EmptyListProps) {
  return (
    <div className="mt-[201px] flex flex-col items-center">
      <Dissatisfied />
      <p className="mt-[15px] text-[18px] font-semibold text-gray-8">
        찾으시는 <span className="text-red">{`"${keyword}"`}</span> 검색 결과가 없어요
      </p>
    </div>
  );
}

export default EmptyList;
