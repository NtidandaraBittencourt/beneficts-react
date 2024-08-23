import React from 'react';
import { Typography } from '@mui/material';

const EmployeeDetails = ({ employee }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom component="div">
        Dados do funcionário:
      </Typography>
      <div className="flex justify-between">
        <div>
          <Typography variant="subtitle2" gutterBottom component="p">
            Nome: {employee.name}
          </Typography>
          <Typography variant="subtitle2" gutterBottom component="div">
            Email: {employee.email}
          </Typography>
          <Typography variant="subtitle2" gutterBottom component="div">
            CPF: {employee.cpf}
          </Typography>
          <Typography variant="subtitle2" gutterBottom component="div">
            Endereço: {employee.address}
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle2" gutterBottom component="div">
            Data de admissão: {employee.dtAdmission}
          </Typography>
          <Typography variant="subtitle2" gutterBottom component="div">
            Peso: {employee.weight} kg
          </Typography>
          <Typography variant="subtitle2" gutterBottom component="div">
            Altura: {employee.height} m
          </Typography>
          <Typography variant="subtitle2" gutterBottom component="div">
            Horas meditadas nos últimos 7 dias: {employee.hoursMeditated} Horas
          </Typography>
        </div>
      </div>
    </>
  );
};

export default EmployeeDetails;
