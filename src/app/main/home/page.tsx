import React, { useState, useEffect } from "react";
import Feeds from "@/src/components/Feed/Feeds";
import Topbar from "@/src/components/Main/Topbar";

const Home = () => {
  return (
    <div className="home_container w-full max-w-6xl mx-auto bg-orange-500">
      <section className="flex flex-col">
        <Topbar />
        <Feeds />
      </section>
    </div>
  );
};

export default Home;
