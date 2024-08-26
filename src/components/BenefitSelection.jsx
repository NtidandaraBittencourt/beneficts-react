import React, { useState, useEffect } from 'react';
import { CircularProgress, Grid, Box } from '@mui/material';
import BenefitCard from './Generics/BenefitCard';
import api from '../services/api';

const BenefitSelection = ({ employeeId, onSelectionChange }) => {
  const [benefits, setBenefits] = useState([]);
  const [selectedBenefits, setSelectedBenefits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState([]);
  
  useEffect(() => {
    const fetchBenefits = async () => {
      if (!employeeId) return;
  
      try {
        setLoading(true);
  
        const response = await api.get('/benefits');
        setBenefits(response.data);

        const emp = await api.get(`/employees/${employeeId}`);
        setEmployee(emp.data);
  
        const empBenefits = emp.data.benefits || [];
        setSelectedBenefits(empBenefits);
        onSelectionChange(empBenefits);
      } catch (error) {
        console.error('Erro ao buscar benefícios:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchBenefits();
  }, [employeeId]);

  const handleChange = (benefit) => {
    setSelectedBenefits((prev) => {
      const alreadySelected = prev.some((b) => b.id === benefit.id);
      const updatedBenefits = alreadySelected
        ? prev.filter((b) => b.id !== benefit.id)
        : [...prev, benefit];
      
      onSelectionChange(updatedBenefits);
      return updatedBenefits;
    });
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {benefits.map((benefit) => (
          <Grid item key={benefit.id} xs={12} sm={6} md={4}>
            <BenefitCard
              benefit={benefit}
              selected={selectedBenefits.some((b) => b.id === benefit.id)}
              onSelect={handleChange}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BenefitSelection;
