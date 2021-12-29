import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import API from "../../API";
import "./index.css";

function LoginForm() {

    return (
        <div>
            <section className="row justify-content-center">
                <div id="loginDiv" className="col-sm-12 col-md-6 col-lg-6">
                    <Stack spacing={2} direction="row">
                        <Button sx={{
                                backgroundColor: '#497b94',
                        }}
                        variant="contained" 
                        href="/auth/google"
                        >
                            Login
                        </Button>
                    </Stack>
                </div>
            </section>
        </div>
    );
}

export default LoginForm;