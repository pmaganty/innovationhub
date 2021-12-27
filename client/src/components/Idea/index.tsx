import React, { useRef } from 'react';
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

function Idea(props:Idea) {

  const donateRef = useRef<HTMLInputElement>();

  async function donate() {

    console.log("donate button clicked");
    const currentIdea = await API.getStripeId(props.id);

    const currentId = currentIdea.data.rows[0].stripe_id;

    console.log(currentId);

    const newPayment: Payment = {
      amount: parseInt(donateRef.current?.value!) * 100, //amount passed to stripe must be in cents
      stripe_id: currentId,
      title: props.title
    };

    const session = await API.donateMoney(newPayment);
    console.log(session);

    window.location.href = session.data.url;
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
                {props.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {props.description}
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
                  required
                  id="outlined-required"
                  label="Required"
                  defaultValue="Title"
                  inputRef={donateRef}
                  />
              </div>
              <Button size="small" color="primary" onClick={donate}>
              Donate
              </Button>
            </Box>
          </CardActions>
        </Card>
      </section>
    </div>
  );
}

export default Idea;