import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Card, CardContent, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import InputMask from 'react-input-mask';
import employeeSchema from '../utils/validation';
import api from '../services/api';
import GenericModal from './Generics/GenericModal';
import BenefitSelection from './BenefitSelection';

const initialEmployeeState = {
  name: '',
  cpf: '',
  email: '',
  dtAdmission: '',
  address: '',
  weight: '',
  height: '',
  hoursMeditated: '',
  benefits: []
};

const EmployeeForm = ({ onSubmit }) => {
  const [openModal, setOpenModal] = useState(false);
  const [employeeId, setEmployeeId] = useState(null);
  const [message, setMessage] = useState({ msg: '', status: 'success' });

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialEmployeeState,
    validationSchema: employeeSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await api.post('/employees', values);
        resetForm();
        onSubmit && onSubmit(values);
        setMessage({ msg: "Funcionário cadastrado com sucesso!!", status: 'success' });
      } catch (error) {
        console.error('Erro ao cadastrar funcionário:', error);
        setMessage({ msg: "Erro ao cadastrar funcionário!", status: 'error' });
      }
    },
  });

  const handleClear = () => {
    formik.resetForm();
  };

  useEffect(() => {
    if (message.msg) {
      const timer = setTimeout(() => {
        if(message.status === 'success') navigate('/');
        setMessage({ msg: '', status: '' });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSaveAndOpenModal = async () => {
    const errors = await formik.validateForm();
    console.log()

    if (Object.keys(errors).length === 0) {
      try {
        const response = await api.post('/employees', formik.values);
        formik.resetForm();
        setEmployeeId(response.data.id);
        setOpenModal(true);
      } catch (error) {
        setMessage({ msg: "Erro ao salvar e abrir o modal.", status: 'warning' });
        console.error('Erro ao salvar e abrir o modal:', error);
      }
    } else {
      setMessage({ msg: "Preencha o formulário antes de continuar!", status: 'warning' });
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSaveBenefits = () => {
    handleCloseModal();
    setMessage({ msg: "Funcionário cadastrado com sucesso!!", status: 'success' });
  };

  return (
    <Card variant="outlined" className="p-6 mx-auto max-w-md">
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <Typography variant="h5" className="mb-6 pb-6 text-center">
            Adicionar beneficiário
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Nome completo"
                name="name"
                fullWidth
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant="outlined"
                size="small"
                className="mb-4"
                error={formik.touched.name && !!formik.errors.name}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="E-mail"
                name="email"
                type="email"
                fullWidth
                size="small"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant="outlined"
                className="mb-4"
                error={formik.touched.email && !!formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <InputMask
                mask="999.999.999-99"
                value={formik.values.cpf}
                onChange={(e) => formik.setFieldValue('cpf', e.target.value)}
                onBlur={formik.handleBlur}
                name="cpf"
              >
                {() => (
                  <TextField
                    label="CPF"
                    fullWidth
                    size="small"
                    variant="outlined"
                    className="mb-4"
                    error={formik.touched.cpf && !!formik.errors.cpf}
                    helperText={formik.touched.cpf && formik.errors.cpf}
                  />
                )}
              </InputMask>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Endereço completo"
                name="address"
                type="text"
                fullWidth
                size="small"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant="outlined"
                className="mb-4"
                error={formik.touched.address && !!formik.errors.address}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Data de admissão"
                name="dtAdmission"
                type="date"
                fullWidth
                size="small"
                value={formik.values.dtAdmission}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant="outlined"
                className="mb-4"
                InputLabelProps={{
                  shrink: true,
                }}
                error={formik.touched.dtAdmission && !!formik.errors.dtAdmission}
                helperText={formik.touched.dtAdmission && formik.errors.dtAdmission}
              />
            </Grid>
            <Grid container spacing={3} className="pt-6 pl-6">
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Peso (kg)"
                  name="weight"
                  type="number"
                  value={formik.values.weight}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  variant="outlined"
                  size="small"
                  fullWidth
                  className="mb-4"
                  error={formik.touched.weight && !!formik.errors.weight}
                  helperText={formik.touched.weight && formik.errors.weight}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Altura (cm)"
                  name="height"
                  type="number"
                  fullWidth
                  size="small"
                  value={formik.values.height}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  variant="outlined"
                  className="mb-4"
                  error={formik.touched.height && !!formik.errors.height}
                  helperText={formik.touched.height && formik.errors.height}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Horas meditadas nos últimos 7 dias"
                name="hoursMeditated"
                type="number"
                fullWidth
                size="small"
                value={formik.values.hoursMeditated}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant="outlined"
                className="mb-4"
                error={formik.touched.hoursMeditated && !!formik.errors.hoursMeditated}
                helperText={formik.touched.hoursMeditated && formik.errors.hoursMeditated}
              />
            </Grid>
            <Grid item xs={12} className="flex justify-end gap-2">
              <Button
                variant="text"
                color="primary"
                onClick={handleClear}
                size="small"
                className="bg-blue-500 hover:text-blue-700 text-white"
              >
                Limpar
              </Button>
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                size="small"
                className="bg-blue-500 hover:bg-blue-700 text-white"
                sx={{
                  borderRadius: '50px',
                  width: '45%',
                  height: '50px'}}
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Cadastrar
              </Button>
              <Button
                variant="contained"
                onClick={() => handleSaveAndOpenModal()}
                size="small"
                className="bg-blue-500 hover:bg-blue-700 text-white "
                sx={{
                  borderRadius: '50px',
                  width: '45%',
                  height: '50px'}}
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Cadastrar e continuar
              </Button>
            </Grid>
          </Grid>
        </form>
        {message.msg && <Alert variant="filled" severity={message.status}> {message.msg}</Alert>}
        <GenericModal
          open={openModal}
          onClose={handleCloseModal}
          title="Selecione os benefícios"
          content={<BenefitSelection
            employeeId={employeeId}
            onSave={handleSaveBenefits}
          />}
          actions={
            <Button onClick={handleCloseModal} color="primary">
              Cancelar
            </Button>
          }
        />
      </CardContent>
    </Card>
  );
};

export default EmployeeForm;
