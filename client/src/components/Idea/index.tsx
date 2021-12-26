import React from 'react';
import "./index.css";
import { Col, Row, Container } from "react-bootstrap";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

interface Idea {
  firstName: string;
  lastName: string;
  title: string;
  description: string;
}

function Idea(props:Idea) {
  return (
    <div>
        <Card sx={{ maxWidth: 345 }}>
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
            <Button size="small" color="primary">
              Donate
            </Button>
          </CardActions>
        </Card>
    </div>
  );
}

export default Idea;