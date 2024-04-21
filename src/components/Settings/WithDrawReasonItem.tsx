import React from "react";
import CheckedCircle from "@assets/icons/common/checkedcircle.svg";
import UncheckedCircle from "@assets/icons/common/uncheckedcircle.svg";
import { Input } from "@/components/ui/input";

interface WithDrawReasonItemProps {
  id: string;
  reason: string;
  withdrawReason: string;
  selectReasonHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function WithDrawReasonItem({ id, reason, withdrawReason, selectReasonHandler }: WithDrawReasonItemProps) {
  return (
    <>
      <label htmlFor={id} className="flex gap-2 items-center">
        {withdrawReason === id ? <CheckedCircle /> : <UncheckedCircle />}
        <Input
          type="checkbox"
          id={id}
          name="reason"
          value={withdrawReason}
          onChange={selectReasonHandler}
          className="hidden"
        />
        {reason}
      </label>
    </>
  );
}

export default WithDrawReasonItem;
