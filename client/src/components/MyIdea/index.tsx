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

// MyIdea to print ideas associated with user
function MyIdea(props:Idea) {

  return (
    <div>
      <section className="col-override col-xs-12 col-sm-12 col-md-6 col-lg-6">
        <Card sx={{ maxWidth: 500, width:  500}}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {props.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <div id="descrOverFlow">{props.description}</div>
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                <div id="donationDiv">
                  Donations: ${props.donations}
                </div>
              </Typography>
            </CardContent>
        </Card>
      </section>
    </div>
  );
}

export default MyIdea;