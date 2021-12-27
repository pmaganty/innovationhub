import React from 'react';
import Header from "../components/Header";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function SuccessSub() {

  const navigate = useNavigate();

  async function navigateToHome() {
      navigate("/");
  }

  return (
    <div>
        <Header />
        <section className="row justify-content-center">
            <div className="col-sm-12 col-md-6 col-lg-6">
                <Stack sx={{ width: '50%', margin: 'auto', marginTop: '30px' }} spacing={2}>
                <Alert severity="success">
                  <AlertTitle>Success</AlertTitle>
                  Your submission was <strong>sucessful</strong>!
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