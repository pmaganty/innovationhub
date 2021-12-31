import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderProt from "../components/HeaderProt";
import HomeImg from "../components/HomeImg";
import HomeDescProt from '../components/HomeDescProt';
import API from "../API";

// Home page for logged-in users
function HomeProt() {

  const navigate = useNavigate();

  // Check if user is logged in.
  // If they are not, redirect to home.
  async function checkLoggedIn() {
    const user = await API.checkUser();
    if (user.data == "") {
      console.log("user not logged in");
      navigate("/");
    }
  }

  useEffect(() => {
    checkLoggedIn();
  }, []); 

  return (
    <div>
      <HeaderProt />
      <HomeImg />
      <HomeDescProt />
    </div>
  );
}

export default HomeProt;