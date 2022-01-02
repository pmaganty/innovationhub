import React, { useRef, useState } from 'react';
import "./index.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import API from "../../API";


interface Idea {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  description: string;
}

interface Payment {
  amount: number;
  stripe_id: number;
  title: string;
  idea_id: number;
}

interface IdeaUpdateInfo {
  donation: number;
}

// Idea component contains information about each idea
function Idea(props:Idea) {

  // Define error flag
  const [errorFlag, setErrorFlag] = useState<Boolean>(false);


  const donateRef = useRef<HTMLInputElement>();

  /*
  Function that will:
    1. validate donation user input
    2. add donation to idea in database
    3. reroute user to stripe payment form
    4. stripe will reroute user to success or fail page
  */
  async function donate() {

    // 1. validate donation user input
    if (!validateDonation()) {

      setErrorFlag(!errorFlag);
      setErrorFlag(true);
    
    } else {

      setErrorFlag(!errorFlag);
      setErrorFlag(false)

      // 2. add donation to idea in database
      const currentIdea = await API.getStripeId(props.id);
      const currentId = currentIdea.data.rows[0].stripe_id;

      const newPayment: Payment = {
        amount: parseInt(donateRef.current?.value!) * 100, //amount passed to stripe must be in cents
        stripe_id: currentId,
        title: props.title,
        idea_id: props.id
      };

      const newUpdate: IdeaUpdateInfo = {
        donation: parseInt(donateRef.current?.value!)
      };
      const addDonation = await API.updateIdea(newUpdate, props.id);

      // 3. reroute user to stripe payment form
      const session = await API.donateMoney(newPayment);
      window.location.href = session.data.url;

      // Step 4 will occur after stripe payment entry
    }
  }

  // Validate donation input exists and is a whole number
  function validateDonation() {
    if (donateRef.current?.value.match(/^[0-9]+$/)) {
      return true;
    } else {
      return false;
    }
  }

  let donationErrSection;

  // Conditionally render error message based on error flag
  if (errorFlag){
      if (!validateDonation()) {
          donationErrSection = 
          <section id="donateErr">
              Please enter a valid, whole number.
          </section>;
      } else { donationErrSection = <section></section> }
  }

  // render div to dom
  return (
    <div>
      <section className="col-override col-xs-11 col-sm-11 col-md-6 col-lg-6">
        <Card sx={{ maxWidth: 500, width:  500}}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <div id="titleDiv">
                {props.title}
                </div>
              </Typography>
              <Typography variant="body2" color="text.secondary">
              <div id="descrOverFlow">{props.description}</div>
              </Typography>
            </CardContent>
            <CardActions>
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
                sx={{
                  padding: "2px",
                  fontSize: "15px"
                  }}
                id="outlined-search" label="Donation" type="donation" inputRef={donateRef}/>
                </div>
                <Button size="small" color="primary" onClick={donate}>
                Donate
                </Button>
                {donationErrSection}
              </Box>
            </CardActions>
        </Card>
      </section>
    </div>
  );
}

export default Idea;