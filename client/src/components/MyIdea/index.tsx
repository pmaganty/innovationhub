import React, { useContext, createContext } from 'react';
import "../Idea/index.css";
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
import ClearIcon from '@mui/icons-material/Clear';

interface Idea {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  description: string;
  donations: number;
}

function MyIdea(props:Idea) {

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
              <Typography gutterBottom variant="h5" component="div">
                <div id="donationDiv">
                  Donations: ${props.donations}
                </div>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </section>
    </div>
  );
}

export default MyIdea;