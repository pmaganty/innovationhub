import React, { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import HeaderProt from '../components/HeaderProt';
import API from '../API';

// Navigate to this page if user payment information submission unsuccessful
function FailSub() {

  const navigate = useNavigate();

  async function navigateToHome() {
      navigate("/home");
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

    // Delete donation once at render
    useEffect(() => {
        checkLoggedIn();
    }, []);

  return (
    <div>
        <HeaderProt />
        <section className="row justify-content-center">
            <div className="col-sm-12 col-md-6 col-lg-6">
                <Stack sx={{ width: '70%', margin: 'auto', marginTop: '30px' }} spacing={2}>
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Your payment information submission was <strong>unsucessful</strong> and the idea was <strong>not created</strong>.
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

export default FailSub;