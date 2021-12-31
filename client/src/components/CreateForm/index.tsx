import React, {useRef, useState} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import API from "../../API";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import "./index.css";

// React component that creates a form for users to input new ideas
function CreateForm() {

    // Error code definition
    interface Errors {
        first: boolean;
        last: boolean;
        title: boolean;
        email: boolean;
    }

    const [errorFlag, setErrorFlag] = useState<Errors>({
        first: false,
        last: false,
        title: false,
        email: false
    });

    // Keeping track of user input to the create form box using React useRef hook
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
    

    /*
    Function is called when submit button is clicked.
    It will:
        1. validate user input and return error if not valid
        2. add user idea into the database if no errors on submit
        3. reroute the user to the stripe payment information entry
        4. stripe will then reroute user to a success or failure page
    */
    async function addNew() {

        // 1. validate user input and return error if not valid
        if (!validateFirstName() || !validateLastName() || !validateTitle() || !validateEmail()) {
            if (!validateFirstName()) {
                setErrorFlag({
                    first: !errorFlag.first,
                    last: errorFlag.last,
                    title: errorFlag.title,
                    email: errorFlag.email
                });
                setErrorFlag({
                    first: true,
                    last: errorFlag.last,
                    title: errorFlag.title,
                    email: errorFlag.email
                });
            }
            if (!validateLastName()) {
                setErrorFlag({
                    first: errorFlag.first,
                    last: !errorFlag.last,
                    title: errorFlag.title,
                    email: errorFlag.email
                });
                setErrorFlag({
                    first: errorFlag.first,
                    last: true,
                    title: errorFlag.title,
                    email: errorFlag.email
                });
            } 
            if (!validateTitle()) {
                console.log("title wrong")
                setErrorFlag({
                    first: errorFlag.first,
                    last: errorFlag.last,
                    title: !errorFlag.title,
                    email: errorFlag.email
                });
                setErrorFlag({
                    first: errorFlag.first,
                    last: errorFlag.last,
                    title: true,
                    email: errorFlag.email
                });
            }
            if (!validateEmail()) {
                setErrorFlag({
                    first: errorFlag.first,
                    last: errorFlag.last,
                    title: errorFlag.title,
                    email: !errorFlag.email
                });
                setErrorFlag({
                    first: errorFlag.first,
                    last: errorFlag.last,
                    title: errorFlag.title,
                    email: true
                });
            }
        } else {

            setErrorFlag({
                first: !errorFlag.first,
                last: !errorFlag.last,
                title: !errorFlag.title,
                email: !errorFlag.email
            });
            setErrorFlag({
                first: false,
                last: false,
                title: false,
                email: false
            });

            // get current user id
            const curUser = await API.checkUser();

            const newIdea: Idea = {
                firstName: firstNameRef.current?.value!,
                lastName: lastNameRef.current?.value!,
                title: titleRef.current?.value!,
                description: descRef.current?.value!,
                email: emailRef.current?.value!,
                user_id: curUser.data.id
            };

            // 2. add user idea into the database if no errors on submit
            const idea = await API.addIdea(newIdea);

            // 3. reroute the user to the stripe payment information entry
            const stripeOut = await API.stripeOnboard({email: emailRef.current?.value!, id: idea.data.rows[0].ideas_id});
            window.location.href = stripeOut.data.url;

            // Step 4 will occur after re-route.
        }
    }

    // Validate first name input exists.
    function validateFirstName() {    
        if (firstNameRef.current?.value) {
            return true;
        } else {
            return false;
        }
    }
    // Validate last name input exists
    function validateLastName() {    
        if (lastNameRef.current?.value) {
            return true;
        } else {
            return false;
        }
    }

    // Validate title input exists
    function validateTitle() {    
        console.log("title validation");
        if (titleRef.current?.value) {
            return true;
        } else {
            return false;
        }
    }

    // Validate email input exists in the correct format
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

    // Conditionally render error message to dom based on error flag
    if (errorFlag.first || errorFlag.last || errorFlag.title || errorFlag.email) {

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
        } else { 
            firstNameErrSection = <section></section>;
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
        } else { 
            lastNameErrSection = <section></section>;
        }

        if (!validateTitle()) {
            console.log("title wrong render");
            titleErrSection = 
            <section className="col-sm-12 col-md-12 col-lg-12">
                <Stack sx={{ width: '50%', margin: 'auto', marginTop: '30px' }} spacing={2}>
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        Please enter a title.
                    </Alert>
                </Stack>
            </section>;
        } else { 
            titleErrSection = <section></section>;
        }

        if (!validateEmail()) {
            emailErrSection = 
            <section className="col-sm-12 col-md-12 col-lg-12">
                <Stack sx={{ width: '50%', margin: 'auto', marginTop: '30px' }} spacing={2}>
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        Please enter a valid email address;
                    </Alert>
                </Stack>
            </section>;
        } else { 
            emailErrSection = <section></section>;
        }

    }

    // Return div to be rendered to dom
    return (
    <div>
        <div className="row justify-content-center">
            {/*conditional error blocks*/}
            {firstNameErrSection}
            {lastNameErrSection}
            {titleErrSection}
            {emailErrSection}

            {/*create idea form*/}
            <div id="formDiv" className="col-auto">
                <div className="row justify-content-center">
                    <div id="inputDiv" className="col-12">
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
                <div id="submitDiv" className="col-auto">
                    <Button sx={{
                        backgroundColor: '#497b94',
                        "&:hover": {
                            backgroundColor: "#497b94"
                            }
                        }}
                        variant="contained" onClick={addNew}>Submit</Button>
                </div>
            </div>
        </div>
    </div>
    );
}

export default CreateForm;