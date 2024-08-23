import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

const BenefitCard = ({ benefit, selected, onSelect }) => {

  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        maxWidth: '100%', 
        borderColor: selected ? 'primary.main' : 'grey.300',
        borderWidth: selected ? 2 : 1,
        cursor: 'pointer',
        '&:hover': {
          borderColor: 'primary.main',
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      onClick={() => onSelect(benefit)}
    >
      <CardMedia
        component="img"
        height="140"
        image={benefit.image}
        alt={benefit.name}
      />
      <CardContent>
        <Typography variant="body2">{benefit.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          Empresa: {benefit.company}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BenefitCard;
