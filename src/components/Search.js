

// C:\Users\kanka\OneDrive\Desktop\Smart-frontend-internship\weather-dashboard\src\components\Search.js

import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, List, ListItem } from '@mui/material';

const Search = ({ setWeatherData }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = async () => {
    const API_KEY = '49cc8c821cd2aff9af04c9f98c36eb74';
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`
    );
    setWeatherData(response.data);
  };

  const handleInputChange = async (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      const API_KEY = '49cc8c821cd2aff9af04c9f98c36eb74';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/find?q=${e.target.value}&type=like&sort=population&cnt=5&appid=${API_KEY}`
      );
      setSuggestions(response.data.list);
    }
  };

  return (
    <div>
      <TextField
        label="Search City"
        value={query}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
      <List>
        {suggestions.map((item) => (
          <ListItem key={item.id} onClick={() => setQuery(item.name)}>
            {item.name}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Search;
