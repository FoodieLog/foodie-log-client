import MainHeader from "@components/Common/Header/MainHeader";
import FeedsCategoryList from "@components/Feed/FeedsCategoryList";

const Home = () => {
  return (
    <div className="home_container w-full max-w-6xl mx-auto pb-[110px]">
      <section className="flex flex-col">
        <MainHeader />
        <FeedsCategoryList />
      </section>
    </div>
  );
};

export default Home;
