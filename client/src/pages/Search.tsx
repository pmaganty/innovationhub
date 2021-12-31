import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderProt from '../components/HeaderProt';
import SearchArea from "../components/SearchArea";
import API from "../API";

// Page where user can search for ideas
function Search() {
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
        <SearchArea />
    </div>
  );
}

export default Search;