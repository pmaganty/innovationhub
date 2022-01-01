import React, { useEffect } from 'react';
import Header from "../components/Header";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import API from "../API";

// Redirect to this page if user login is unsuccessful
function FailLogin() {

    const navigate = useNavigate();

    async function navigateToHome() {
        navigate("/");
    }

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
        <Header />
        <section className="row justify-content-center">
            <div className="col-sm-12 col-md-6 col-lg-6">
                <Stack sx={{ width: '50%', margin: 'auto', marginTop: '30px' }} spacing={2}>
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Your login was <strong>unsuccessful</strong>.
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

export default FailLogin;