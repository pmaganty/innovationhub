import React, {useRef} from "react";
import Img from "./ihub_img_3.png";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import API from "../../API";
import "./index.css";


function CreateForm() {

    const firstNameRef = useRef<HTMLInputElement>();
    const lastNameRef = useRef<HTMLInputElement>();
    const titleRef = useRef<HTMLInputElement>();
    const descRef = useRef<HTMLInputElement>();
    const emailRef = useRef<HTMLInputElement>();

    let firstName = "";
    let lastName = "";
    let title = "";
    let description = "";
    let email = "";
    
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

  return (
    <div>
        <div className="row justify-content-center">
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
                                <TextField
                                required
                                id="outlined-required"
                                label="Required"
                                defaultValue="First Name"
                                inputRef={firstNameRef}
                                />

                                <TextField
                                required
                                id="outlined-required"
                                label="Required"
                                defaultValue="Last Name"
                                inputRef={lastNameRef}
                                />
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
                                <TextField
                                required
                                id="outlined-required"
                                label="Required"
                                defaultValue="Title"
                                inputRef={titleRef}
                                />
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
                                <TextField
                                required
                                id="outlined-required"
                                label="Required"
                                defaultValue="Email"
                                inputRef={emailRef}
                                />
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