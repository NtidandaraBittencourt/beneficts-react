import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api, { fetchEmployees } from '../services/api';
import GenericModal from '../components/Generics/GenericModal';
import BenefitSelection from '../components/BenefitSelection';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Menu,
  MenuItem,
  Button,
  Paper,
  IconButton,
  CircularProgress,
  Alert,
  Collapse,
  Box,
  Typography
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Dashboard = () => {
  const [search, setSearch] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [employeeId, setEmployeeId] = useState(null);
  const [message, setMessage] = useState({msg: '', status: 'success' })
  const [openCollapse, setOpenCollapse] = React.useState(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    queryKey: ['employees', search],
    queryFn: () => fetchEmployees(search),
    keepPreviousData: true,
  });

  const handleFilterChange = (event) => {
    setSearch(event.target.value);
  };

  const onRefresh = () => {
    queryClient.invalidateQueries(['employees']);
  };

  const handleMenuOpen = (event, employee) => {
    setAnchorEl(event.currentTarget);
    setSelectedEmployee(employee);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = async (option) => {
    handleMenuClose();
    if (option === 'Edit') {
      // verificar
      navigate(`/edit-employee/${selectedEmployee.id}`); 
    } else if (option === 'Delete') {
      await api.delete(`/employees/${selectedEmployee?.id}`);
      setMessage({ msg: "Funcionário excluido.", status: 'success'})
      onRefresh();
    }
  };

  const handleEditBenefits = () => {
    handleMenuClose();
    setEmployeeId(selectedEmployee?.id)
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    onRefresh();
    setOpenModal(false);
  };

  const handleSaveBenefits = () => {
    setMessage({ msg: "Funcionário cadastrado com seus benefícios com sucesso!!", status: 'success'})
    onRefresh();
    handleCloseModal();
  };

  useEffect(() => {
    if (message.msg) {
      const timer = setTimeout(() => {
        navigate('/')
        setMessage({ msg: '', status: '' });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Não foi possivel exibir os beneficiários: {error.message}</div>;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TextField
        label="Buscar"
        variant="outlined"
        fullWidth
        onChange={handleFilterChange}
        sx={{ margin: 2 }}
        value={search}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Benefícios cadastrados</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((employee, index) => (
              <>
                <TableRow
                  key={employee.id}
                  hover
                  sx={{
                    '&:hover': { cursor: 'pointer', backgroundColor: '#f5f5f5' },
                    backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#ffffff'
                  }}
                >
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => setOpenCollapse(openCollapse === index ? null : index)}
                    >
                      {openCollapse === index ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.benefits.map((benefit) => benefit.name).join(', ')}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={(event) => handleMenuOpen(event, employee)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      sx={{}}
                    >
                      <MenuItem onClick={() => handleOptionClick('Edit')}>Editar</MenuItem>
                      <MenuItem onClick={() => handleOptionClick('Delete')}>Excluir</MenuItem>
                      <MenuItem onClick={() => handleEditBenefits()}>Adicionar benefício</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={openCollapse === index} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
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
                            CPF: {employee.email}
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
                            Peso:{employee.weight} kg
                          </Typography>
                          <Typography variant="subtitle2" gutterBottom component="div">
                            Altura:{employee.height} m
                          </Typography>
                          <Typography variant="subtitle2" gutterBottom component="div">
                            Horas meditadas nos ultimos 7 dias: {employee.hoursMeditated} Horas
                          </Typography>
                        </div>
                        </div>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
          <Button onClick={handleSaveBenefits} color="primary" variant="contained">
            Salvar Benefícios
          </Button>
        }
      />
    </Paper>
  );
};

export default Dashboard;
