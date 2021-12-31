import React from 'react';
import HeaderProt from "../components/HeaderProt";
import HomeImg from "../components/HomeImg";
import HomeDescProt from '../components/HomeDescProt';

// Home page for logged-in users
function HomeProt() {
  return (
    <div>
      <HeaderProt />
      <HomeImg />
      <HomeDescProt />
    </div>
  );
}

export default HomeProt;