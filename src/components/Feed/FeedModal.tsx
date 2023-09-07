import useSignUpStore from "@/src/store/useSignUpStore";
import React, { useState } from "react";
import { updateFeed } from "../../services/apiFeed";

interface FeedModalProps {
  feedId: number;
  preContent: string;
}
function FeedModal({ feedId, preContent }: FeedModalProps) {
  const [content, setContent] = useState(preContent);
  const setNextComponent = useSignUpStore((state) => state.setNextComponent);

  console.log(content);

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const onClickClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setNextComponent("");
  };

  const onClickEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await updateFeed(feedId, content);
      console.log("수정 성공", res);
    } catch (err) {
      console.error("수정 에러", err);
    }
  };
  return (
    <div className="fixed flex justify-center items-center bg-gray-300 top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-start justify-between p-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">피드 수정</h3>
          </div>
          <form className="mx-5">
            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700">
              <div className=" px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                <label htmlFor="comment" className="sr-only">
                  Your comment
                </label>
                <textarea
                  onChange={onChangeTextArea}
                  value={content}
                  id="comment"
                  className="w-full px-0 text-sm resize-none text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                  placeholder="내용을 입력해 주세요!"
                  required
                ></textarea>
              </div>
            </div>
          </form>

          <div className="flex items-center p-6 rounded-b gap-3">
            <button
              onClick={onClickClose}
              data-modal-hide="defaultModal"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              취소
            </button>
            <button
              onClick={onClickEdit}
              data-modal-hide="defaultModal"
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              수정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedModal;
