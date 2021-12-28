import React from 'react';
import Header from "../components/Header";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import API from "../API";

function Login() {

    return (
        <div>
            <Header />
            <Stack spacing={2} direction="row">
                <Button variant="contained" href="/auth/google">Login</Button>
            </Stack>
        </div>
    );
}

export default Login;