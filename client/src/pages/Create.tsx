import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateForm from "../components/CreateForm";
import HeaderProt from '../components/HeaderProt';
import API from "../API";

// Create Form
function Create() {

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
        <CreateForm />
    </div>
  );
}

export default Create;