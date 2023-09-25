// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { getTimeDiff } from "@/src/utils/date";

// const NotificationList = () => {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     // API 호출하여 알림 정보 가져오기
//     fetch("/api/notification/list")
//       .then((response) => response.json())
//       .then((data) => {
//         setNotifications(data.response.content);
//       });
//   }, []);

//   return (
//     <div className="w-full flex flex-col">
//       {notifications.map((notification) => {
//         const timeDifference = getTimeDiff(new Date(notification.createdAt));
//         return (
//           <div key={notification.id} className="flex items-center justify-between mb-4 hover:bg-slate-100 p-4">
//             <div className="flex items-center">
//               <Image
//                 src={notification.user.profileImgUrl || "/images/userImage.png"}
//                 alt="사용자 썸네일"
//                 width={48}
//                 height={48}
//                 className="border p-1 rounded-full cursor-pointer"
//               />
//               <div className="ml-2">
//                 <span className="font-bold">{notification.user.nickName}</span>
//                 <span className="text-xs text-gray-500 ml-3">{timeDifference}</span>
//                 <div>
//                   {notification.type === "LIKE" && (
//                     <>
//                       <span>님이 게시글을 좋아합니다.</span>
//                       <Image
//                         src={notification.feed.thumbnail}
//                         alt="피드 썸네일 이미지"
//                         width={48}
//                         height={48}
//                         className="ml-3"
//                       />
//                     </>
//                   )}
//                   {notification.type === "FOLLOW" && (
//                     <>
//                       <span>님이 팔로우 하였습니다.</span>
//                       {/* 팔로우 버튼 추가 (디자인에 따라 조정) */}
//                       <button className="ml-3 px-2 py-1 bg-blue-500 rounded text-white">
//                         팔로우
//                       </button>
//                     </>
//                   )}
//                   {notification.type === "REPLY" && (
//                     <>
//                       <span>님이 댓글을 남겼습니다. "{notification.reply.content}"</span>
//                       <Image
//                         src={notification.reply.thumbnail}
//                         alt="피드 썸네일 이미지"
//                         width={48}
//                         height={48}
//                         className="ml-3"
//                       />
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default NotificationList;
