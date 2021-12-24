import React, {useRef} from "react";
import Img from "./ihub_img_3.png";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


function CreateForm() {

    const firstNameRef = useRef<HTMLInputElement>();
    const lastNameRef = useRef<HTMLInputElement>();
    const titleRef = useRef<HTMLInputElement>();
    const descRef = useRef<HTMLInputElement>();

    let firstName = "";
    let lastName = "";
    let title = "";
    let description = "";
    
    interface Idea {
        firstName: string;
        lastName: string;
        title: string;
        description: string;
    }
    
    function addNew() {

        const newIdea: Idea = {
            firstName: firstNameRef.current?.value!,
            lastName: lastNameRef.current?.value!,
            title: titleRef.current?.value!,
            description: descRef.current?.value!
        };

        //call api to add to database here

    }

  return (
    <div>
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
                <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={addNew}>Contained</Button>
                </Stack>
            </div>
        </div>
    </div>
  );
}

export default CreateForm;