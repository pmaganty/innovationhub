import React from 'react';
import Header from "../components/Header";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import API from "../API";
import LoginForm from '../components/LoginForm';

function Login() {

    return (
        <div>
            <Header />
            <LoginForm />
            <div>TEST</div>
        </div>
    );
}

export default Login;