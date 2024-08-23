import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BenefitCard from './Generics/BenefitCard';
import { Button, CircularProgress, Grid, Box,   } from '@mui/material';
import api from '../services/api';

const BenefitSelection = ({ employeeId, onSave }) => {
  const [benefits, setBenefits] = useState([]);
  const [selectedBenefits, setSelectedBenefits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState([]);
  const [message, setMessage] = useState({msg: '', status: 'success' })

  useEffect(() => {
    const fetchBenefits = async () => {
      if (!employeeId) return;
  
      try {
        setLoading(true);
  
        const response = await api.get('/benefits');
        setBenefits(response.data);

        const emp = await api.get(`/employees/${employeeId}`);
        setEmployee(emp.data);
  
        setSelectedBenefits(emp.data.benefits || []);
      } catch (error) {
        setMessage({ msg: 'Erro ao buscar benefícios', status: 'warning' });
        console.error('Erro ao buscar benefícios:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchBenefits();
  }, [employeeId]);

  useEffect(() => {
    if (message.msg) {
      const timer = setTimeout(() => {
        setMessage({ msg: '', status: '' });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (benefit) => {  
    setSelectedBenefits((prev) => {
      const alreadySelected = prev.some((b) => b.id === benefit.id);

      const updatedBenefits = alreadySelected
        ? prev.filter((b) => b.id !== benefit.id)
        : [...prev, benefit];
      
      return updatedBenefits;
    });
  };

  const handleSubmit = async () => {
    try {
      await api.put(`/employees/${employeeId}`, {...employee, benefits: selectedBenefits});
      // setMessage({ msg: "Funcionário cadastrado com seus benefícios com sucesso!!", status: 'success'})
      onSave()
    } catch (error) {
      setMessage({ msg: "Erro ao atualizar os benefícios", status: 'error'})
      console.error('Erro ao atualizar os benefícios:', error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} >
      {/*  */}
        {benefits.map((benefit) => (
            <Grid item  key={benefit.id} xs={12} sm={6} md={4}>
              {/*  */}
              <BenefitCard
                benefit={benefit}
                selected={selectedBenefits.includes(benefit)}
                onSelect={handleChange}
              />
            </Grid>
          ))}
        </Grid>
      <Button onClick={handleSubmit} color="primary" variant="contained" sx={{ mt: 2 }}>
        Confirmar Benefícios
      </Button>
    </Box>
    {message.msg && <Alert variant="filled" severity={message.status}> {message.msg}</Alert>}
    </div>
  );
};

export default BenefitSelection;
