import BackButtonMain from "@/src/components/Button/BackButtonMain";
import SearchUser from "@/src/components/SearhUser/SearhUser";

const Search = () => {
  return (
    <div className="w-full flex flex-col justify-center max-w-screen-sm mx-auto">
      <div className='flex flex-col items-start justify-center'>
        <BackButtonMain />
        <SearchUser />
      </div>
    </div>
  );
};
export default Search;
