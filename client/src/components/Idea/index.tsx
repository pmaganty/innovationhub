import React, { useRef, useState } from 'react';
import "./index.css";
import { Col, Row, Container } from "react-bootstrap";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import API from "../../API";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


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
}

interface IdeaUpdateInfo {
  donation: number;
}

function Idea(props:Idea) {

  const [errorFlag, setErrorFlag] = useState<Boolean>(false);

  const donateRef = useRef<HTMLInputElement>();

  async function donate() {

    console.log("donate button clicked");

    if (!validateDonation()) {

      setErrorFlag(!errorFlag);
      setErrorFlag(true);
    
    } else {

      setErrorFlag(!errorFlag);
      setErrorFlag(false)

      const currentIdea = await API.getStripeId(props.id);

      const currentId = currentIdea.data.rows[0].stripe_id;

      console.log(currentId);

      const newPayment: Payment = {
        amount: parseInt(donateRef.current?.value!) * 100, //amount passed to stripe must be in cents
        stripe_id: currentId,
        title: props.title
      };

      const newUpdate: IdeaUpdateInfo = {
        donation: parseInt(donateRef.current?.value!)
      };

      const addDonation = await API.updateIdea(newUpdate, props.id);
      const session = await API.donateMoney(newPayment);
      console.log(session);

      window.location.href = session.data.url;
    }
  }

  function validateDonation() {
    if (donateRef.current?.value.match(/^[0-9]+$/)) {
      return true;
    } else {
      return false;
    }
  }

  let donationErrSection;

  if (errorFlag){
      if (!validateDonation()) {
          donationErrSection = 
          <section id="donateErr">
              Please enter a valid, whole number.
          </section>;
      } else { donationErrSection = <section></section> }
  }

  return (
    <div>
      <section className="col-override col-sm-12 col-md-6 col-lg-6">
        <Card sx={{ maxWidth: 500, width:  500}}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <div id="titleDiv">
                {props.title}
                </div>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <div id="ideaAccordian">
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Description</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {props.description}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                </div>
              </Typography>
            </CardContent>
          </CardActionArea>
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
              id="outlined-search" label="First Name" type="donation" inputRef={donateRef}/>
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