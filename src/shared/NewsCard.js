import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function NewsCard({props}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          width="auto"
          height="200px"
          image={props.imgURL}
          alt="news img"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{minHeight: 140}}>
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}