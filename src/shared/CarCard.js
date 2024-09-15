import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

export default function CarCard({car}) {

  return (
    <Card sx={{ display: 'flex', width: '100%' }} style={{marginBottom: '10px', border: '2px solid #eee'}} className="testClass">
      <CardMedia
        component="img"
        sx={{ width: 150, height: 150 }}
        image={car.imgURL}
        alt="car image"
      />
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Box display= 'flex' justifyContent= 'space-between'>
          <Typography component="div" variant="h5">
            {car.make + ', '+ car.model}
          </Typography>
          <Typography variant="h5" className='carCardPrice'>
            {car.price}
          </Typography>
        </Box>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          {car.power}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          {car.fuelType}
        </Typography>
      </CardContent>
    </Card>
  );
}
