import Link from "next/link";
import Image from "next/image";
import usePostStore from "@store/usePostStore";
import useSignUpStore from "@store/useSignUpStore";
import { PiStarThin, PiStarFill } from "react-icons/pi";
import { getIcon } from "@utils/iconUtils";
import { likeRestaurant, unlikeRestaurant } from "@services/apiFeed";
import { MyShopItemProps } from "@@types/mypage";
import { useToast } from "@/components/ui/use-toast";

function MyShopItem({ item, setReload }: MyShopItemProps) {
  const { content, setContent } = usePostStore();
  const setNextComponent = useSignUpStore((state) => state.setNextComponent);
  const shopCategoryIcon = `/images/foodCategoryIcons/${getIcon(item.restaurant.category)}`;

  const { toast } = useToast();

  const onClickShophandler = (e: React.MouseEvent) => {
    e.preventDefault();
    setNextComponent("PostImage");
    setContent({ ...content, ...item });
  };

  const onClickUnLike = async () => {
    try {
      await unlikeRestaurant(item.restaurant.id);
      setReload((pre) => !pre);
    } catch (error) {
      toast({ description: "에러가 발생했습니다. 다시 시도해주세요!" });
    }
  };

  const onClickLike = async () => {
    try {
      await likeRestaurant(item.restaurant.id);
      setReload((pre) => !pre);
    } catch (error) {
      toast({ description: "에러가 발생했습니다. 다시 시도해주세요!" });
    }
  };

  return (
    <div
      onClick={onClickShophandler}
      className="relative flex items-center justify-between py-3 px-10 mt-3 border hover:bg-gray-300 max-sm:text-xs"
    >
      <div className="flex items-center gap-x-5 mr-4">
        <Link href={`/main/restaurants/${item.restaurant.id}`}>
          <div className="relative w-12 h-12">
            <Image
              fill
              src={shopCategoryIcon}
              alt="음식점 썸네일"
              sizes="(max-width: 48px) 48px, 48px"
              className="w-12 h-12 border rounded-full cursor-pointer"
            />
          </div>
        </Link>
        <div key={item.restaurant.id}>
          <Link href={`/main/restaurants/${item.restaurant.id}`}>
            <strong>{item.restaurant.name}</strong>
          </Link>
          <Link href={`/main/restaurants/${item.restaurant.id}`}>
            <p>{item.restaurant.roadAddress}</p>
          </Link>
          <Link href={`/main/restaurants/${item.restaurant.id}`}>
            <p>{item.restaurant.category}</p>
          </Link>
        </div>
      </div>

      {item.isLiked.liked ? (
        <button type="button" onClick={onClickUnLike}>
          <PiStarFill size="2rem" color="#FF6D60" />
        </button>
      ) : (
        <button type="button" onClick={onClickLike}>
          <PiStarThin size="2rem" />
        </button>
      )}
    </div>
  );
}

export default MyShopItem;
