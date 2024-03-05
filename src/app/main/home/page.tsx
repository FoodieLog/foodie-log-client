import React, { useState, useEffect } from "react";
import Feeds from "@components/Feed/Feeds";
import MainHeader from "@components/Common/Header/MainHeader";

const Home = () => {
  return (
    <div className="home_container w-full max-w-6xl mx-auto pb-[110px]">
      <section className="flex flex-col">
        <MainHeader />
        <Feeds />
      </section>
    </div>
  );
};

export default Home;
