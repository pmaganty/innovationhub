import React, { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import HeaderProt from '../components/HeaderProt';
import API from '../API';

// Redirect here if donation is unsuccessful
function FailPayment() {

    // Retrieve query parameters to get idea id
    const [searchParams, setSearchParams] = useSearchParams();
    const idea_id = searchParams.get("idea_id");

    const navigate = useNavigate();

    async function navigateToHome() {
        navigate("/home");
    }

    // Delete the last donation
    async function deleteLastDonation() {
        const deleted = await API.deleteInvalidDonation(idea_id);
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
        deleteLastDonation();
    }, []);

    return (
    <div>
        <HeaderProt />
        <section className="row justify-content-center">
            <div className="col-sm-12 col-md-6 col-lg-6">
                <Stack sx={{ width: '50%', margin: 'auto', marginTop: '30px' }} spacing={2}>
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Your payment was <strong>unsuccessful</strong>.
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

export default FailPayment;