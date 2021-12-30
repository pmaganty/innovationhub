import React, {useRef, useState} from "react";
import Img from "./ihub_img_3.png";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import API from "../../API";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import "./index.css";


function CreateForm() {

    const [errorFlag, setErrorFlag] = useState<Boolean>(false);

    const firstNameRef = useRef<HTMLInputElement>();
    const lastNameRef = useRef<HTMLInputElement>();
    const titleRef = useRef<HTMLInputElement>();
    const descRef = useRef<HTMLInputElement>();
    const emailRef = useRef<HTMLInputElement>();
    
    interface Idea {
        firstName: string;
        lastName: string;
        title: string;
        description: string;
        email: string;
        user_id: string;
    }

    interface Stripe_ID {
        stripe_id: string;
    }
    
    async function addNew() {

        console.log("button clicked");

        if (!validateFirstName() || !validateLastName() || !validateEmail() || !validateTitle()) {

            setErrorFlag(true);
        
        } else {

            const curUser = await API.checkUser();
            console.log(curUser.data.id);

            const newIdea: Idea = {
                firstName: firstNameRef.current?.value!,
                lastName: lastNameRef.current?.value!,
                title: titleRef.current?.value!,
                description: descRef.current?.value!,
                email: emailRef.current?.value!,
                user_id: curUser.data.id
            };

            const idea = await API.addIdea(newIdea);
            console.log(idea.data.rows[0].ideas_id);

            const stripeOut = await API.stripeOnboard({email: emailRef.current?.value!, id: idea.data.rows[0].ideas_id});
            console.log(stripeOut.data.url);
            console.log(stripeOut.data.id);

            window.location.href = stripeOut.data.url;
        }
        
    }

    function validateFirstName() {    
        if (firstNameRef.current?.value) {
            return true;
        } else {
            return false;
        }
    }

    function validateLastName() {    
        if (lastNameRef.current?.value) {
            return true;
        } else {
            return false;
        }
    }

    function validateTitle() {    
        if (titleRef.current?.value) {
            return true;
        } else {
            return false;
        }
    }

    function validateEmail() {
        if (emailRef.current?.value.
            toLowerCase()
            .match(/^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/)
            )
        {
            return true;
        } else {
            return false;
        }
    }

    let firstNameErrSection, lastNameErrSection, titleErrSection, emailErrSection;

    if (!errorFlag){
        firstNameErrSection = <section></section>;
        lastNameErrSection = <section></section>;
        titleErrSection = <section></section>;
        emailErrSection = <section></section>;
    } else {
        if (!validateFirstName()) {
            firstNameErrSection = 
            <section className="col-sm-12 col-md-12 col-lg-12">
                <Stack sx={{ width: '50%', margin: 'auto', marginTop: '30px' }} spacing={2}>
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        Please enter a first Name.
                    </Alert>
                </Stack>
            </section>;
        }
        if (!validateLastName()) {
            lastNameErrSection = 
            <section className="col-sm-12 col-md-12 col-lg-12">
                <Stack sx={{ width: '50%', margin: 'auto', marginTop: '30px' }} spacing={2}>
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        Please enter a last Name.
                    </Alert>
                </Stack>
            </section>;
        }
        if (!validateTitle()) {
            titleErrSection = 
            <section className="col-sm-12 col-md-12 col-lg-12">
                <Stack sx={{ width: '50%', margin: 'auto', marginTop: '30px' }} spacing={2}>
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        Please enter a title.
                    </Alert>
                </Stack>
            </section>;
        }
        if (!validateEmail()) {
            emailErrSection = 
            <section className="col-sm-12 col-md-12 col-lg-12">
                <Stack sx={{ width: '50%', margin: 'auto', marginTop: '30px' }} spacing={2}>
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        Please Enter a valid email address.
                    </Alert>
                </Stack>
            </section>;
        }
    }

  return (
    <div>
        <div className="row justify-content-center">
            {firstNameErrSection}
            {lastNameErrSection}
            {titleErrSection}
            {emailErrSection}
            <div id="formDiv" className="col-sm-auto col-md-auto col-lg-auto">
                <div className="row justify-content-center">
                    <div id="inputDiv" className="col-sm-12 col-md-12 col-lg-12">
                        <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        >
                            <div>
                            <TextField id="outlined-search" label="First Name" type="search" inputRef={firstNameRef}/>
                            <TextField id="outlined-search" label="Last Name" type="search" inputRef={lastNameRef}/>
                            </div>
                        </Box>
                        <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        >
                            <div>
                            <TextField id="outlined-search" label="Title" type="search" inputRef={titleRef}/>
                            </div>
                        </Box>
                        <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        >
                            <div>
                            <TextField id="outlined-search" label="Email" type="search" inputRef={emailRef}/>
                            </div>
                        </Box>
                        <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '75ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        >
                            <div>
                                <TextField
                                id="outlined-multiline-flexible"
                                label="Description"
                                multiline
                                maxRows={10}
                                rows={4}
                                inputRef={descRef}
                                />
                            </div>
                        </Box>
                    </div>
                </div>
                <div id="submitDiv" className="col-sm-auto col-md-auto col-lg-auto">
                    <Button sx={{
                        backgroundColor: '#497b94',
                      }}
                      variant="contained" onClick={addNew}>Submit</Button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default CreateForm;