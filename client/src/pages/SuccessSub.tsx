import React, { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import HeaderProt from '../components/HeaderProt';
import API from '../API';

// Reroute user here if payment information submission successful
function SuccessSub() {

  const navigate = useNavigate();

  async function navigateToHome() {
      navigate("/home");
  }

  // If user not logged in, redirect to home.
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
        <section className="row justify-content-center">
            <div className="col-sm-12 col-md-6 col-lg-6">
                <Stack sx={{ width: '50%', margin: 'auto', marginTop: '30px' }} spacing={2}>
                <Alert severity="success">
                  <AlertTitle>Success</AlertTitle>
                  Your submission was <strong>successful</strong>!
                </Alert>
                <Button size="small" color="primary" onClick={navigateToHome}>
                        Back to Home
                </Button>
                </Stack>
            </div>
        </section>
    </div>
  );
}

export default SuccessSub;