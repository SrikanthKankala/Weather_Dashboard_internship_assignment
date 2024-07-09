



//C:\Users\kanka\OneDrive\Desktop\Smart-frontend-internship\weather-dashboard\src\components\WeatherCard.js


import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) return null;

  const { name, main, weather, wind } = weatherData;

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">{name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">{weather[0].description}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Temperature: {main.temp}°C</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Humidity: {main.humidity}%</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Wind Speed: {wind.speed} m/s</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;








