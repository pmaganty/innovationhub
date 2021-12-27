import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import API from "../API";


function Email() {
    const navigate = useNavigate();

    const emailRef = useRef<HTMLInputElement>();

    async function checkUser() {

        console.log("email button clicked");
        const idea_list = await API.checkEmail(emailRef.current?.value);

        if (idea_list.data.rows.length > 0) {
            navigate("/create");
        } else {
            console.log("new user");
            const stripeOut = await API.stripeOnboard();
            console.log(stripeOut.data.url);
            console.log(stripeOut.data.id);
            window.location.href = stripeOut.data.url;
        }
    }

  return (
    <div>
        <Header />
        <div className="row justify-content-center">
            <div className="col-sm-12 col-md-8 col-lg-8">
                <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                >
                    <div>
                        <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        defaultValue="Email"
                        inputRef={emailRef}
                        />
                    </div>
                </Box>
                <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={checkUser}>Create</Button>
                </Stack>
            </div>
        </div>       
    </div>
  );
}

export default Email;