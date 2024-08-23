import React from 'react';
import { TextField, IconButton } from '@mui/material';
import InputMask from 'react-input-mask';
import CachedIcon from '@mui/icons-material/Cached';

const SearchBar = ({ onChange, onRefresh }) => {

  const handleInputChange = (event) => {
    const { value } = event.target;
    if (value.replace(/[^0-9]/g, '').length === 11) {
      onChange(event)
    }
  };

  return (
    <div className="flex items-center m-4 border-b-2 pb-4">
      <InputMask
        mask="999.999.999-99"
        onChange={handleInputChange}
      >
        {() => (
          <TextField
            label="Buscar por CPF"
            fullWidth
            size="small"
            variant="outlined"
          />
        )}
      </InputMask>
      <IconButton
        onClick={onRefresh}
        color="primary"
        style={{ marginLeft: '16px' }}
        aria-label="reload search"
        size="small"
      >
        <CachedIcon fontSize="small" />
      </IconButton>
    </div>
  );
};

export default SearchBar;
