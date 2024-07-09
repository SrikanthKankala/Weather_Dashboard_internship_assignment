import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const Favorites = ({ favorites, updateCity, removeFavorite }) => {
  return (
    <div>
      <h2>Favorites</h2>
      {favorites.map((city, index) => (
        <Card key={index} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">{city}</Typography>
            <Button variant="contained" color="primary" onClick={() => updateCity(city)}>
              View Weather
            </Button>
            <Button variant="contained" color="secondary" onClick={() => removeFavorite(city)}>
              Remove
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Favorites;
