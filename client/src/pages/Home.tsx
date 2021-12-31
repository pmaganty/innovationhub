import React from 'react';
import Header from "../components/Header";
import HomeImg from "../components/HomeImg";
import HomeDesc from "../components/HomeDesc";

// Home page for non-logged-in users
function Home() {
  return (
    <div>
      <Header />
      <HomeImg />
      <HomeDesc />
    </div>
  );
}

export default Home;