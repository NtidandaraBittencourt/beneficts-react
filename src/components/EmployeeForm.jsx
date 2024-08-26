import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import api from '../services/api';
import employeeSchema from '../utils/validation';
import EmployeeFields from './Form/EmployeeFields';
import BenefitModal from './Form/BenefitsModal';
import MessageAlert from './Generics/MessageAlert';

const initialEmployeeState = {
  name: '',
  cpf: '',
  email: '',
  dtAdmission: '',
  address: '',
  weight: '',
  height: '',
  hoursMeditated: '',
  benefits: [],
};

const EmployeeForm = () => {
  const [employee, setEmployee] = useState(initialEmployeeState);
  const [openModal, setOpenModal] = useState(false);
  const [selectedBenefits, setSelectedBenefits] = useState([]);
  const [message, setMessage] = useState({ msg: '', status: 'success' });
  
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.get(`/employees/${id}`)
        .then(response => {
          setEmployee(response.data);
          setSelectedBenefits(response.data.benefits || []);
        })
        .catch(error => {
          console.error('Erro ao carregar funcionário:', error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (message.msg) {
      const timer = setTimeout(() => {
        if(message.status === 'success' && !openModal) navigate('/')
        setMessage({ msg: '', status: '' });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const formik = useFormik({
    initialValues: employee || initialEmployeeState,
    enableReinitialize: true, 
    validationSchema: employeeSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (id) {
          await api.put(`/employees/${id}`, { ...values, benefits: selectedBenefits });
          setMessage({ msg: "Funcionário atualizado com sucesso!", status: 'success' });
        } else {
          const response = await api.post('/employees', { ...values, benefits: selectedBenefits });
          setMessage({ msg: "Funcionário cadastrado com sucesso!", status: 'success' });
          if(id && openModal) {
            resetForm();
            navigate(`/edit-employee/${response.data.id}`);
          } else if(!openModal){
            navigate('/')
          } else {
            setEmployee(response.data)
            resetForm();
          }
        }
      } catch (error) {
        console.error('Erro ao salvar funcionário:', error);
        setMessage({ msg: "Erro ao salvar funcionário!", status: 'error' });
      }
    },
  });

  const handleSaveAndOpenModal = async () => {
    const errors = await formik.validateForm();

    if (Object.keys(errors).length === 0) {
      formik.handleSubmit();
      setOpenModal(true);
    } else {
      setMessage({ msg: "Preencha o formulário antes de continuar!", status: 'warning' });
    }
  };

  const handleSaveBenefits = async () => {
    try {
      await api.put(`/employees/${id || employee.id}`, { ...employee, benefits: selectedBenefits });
      setMessage({ msg: "Funcionário atualizado com seus benefícios com sucesso!", status: 'success' });
      setOpenModal(false);
    } catch (error) {
      console.error('Erro ao atualizar os benefícios:', error);
      setMessage({ msg: "Erro ao atualizar os benefícios", status: 'error' });
    }
  };

  return (
    <Card variant="outlined" className="p-6 mx-auto max-w-md">
      <CardContent>
        <Typography variant="h5" className="mb-6 pb-6 text-center">
          {id ? 'Editar Funcionário' : 'Adicionar Funcionário'}
        </Typography>
        <EmployeeFields formik={formik} />
        <Grid container spacing={3} className="flex justify-end gap-2 pt-10">
          <Button variant="text" color="primary" onClick={formik.resetForm} size="small">
            Limpar
          </Button>
          <Button type="submit" variant="outlined" color="primary" size="small" onClick={formik.handleSubmit}>
            {id ? 'Atualizar' : 'Cadastrar'}
          </Button>
          <Button variant="contained" onClick={handleSaveAndOpenModal} size="small">
            {id ? 'Atualizar e continuar' : 'Cadastrar e continuar'}
          </Button>
        </Grid>
        {message.msg && <MessageAlert className="mt-4" message={message} />}
        <BenefitModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSave={handleSaveBenefits}
          employeeId={id || employee?.id}
          setSelectedBenefits={setSelectedBenefits}
        />
      </CardContent>
    </Card>
  );
};

export default EmployeeForm;
