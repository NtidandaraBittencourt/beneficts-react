import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { fetchEmployees } from '../services/api';
import EmployeeTable from '../components/Dashboard/EmployeeTable';
import SearchBar from '../components/Dashboard/SearchBar';
import GenericModal from '../components/Generics/GenericModal';
import BenefitSelection from '../components/BenefitSelection';
import { CircularProgress, Paper, Button, Typography, TablePagination } from '@mui/material';
import MessageAlert from '../components/Generics/MessageAlert';

const Dashboard = () => {
  const [search, setSearch] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [employeeId, setEmployeeId] = useState(null);
  const [message, setMessage] = useState({ msg: '', status: 'success' });
  const [openCollapse, setOpenCollapse] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['employees', search, page, rowsPerPage],
    queryFn: () => fetchEmployees(search, page, rowsPerPage),
    keepPreviousData: true,
    enabled: search.length === 0 || search.length >= 11
  });

  const handleFilterChange = (event) => {
    const inputValue = event.target.value;

    if(inputValue.length >=11) {
      setSearch(inputValue);
    }
    
    if (inputValue.length === 0) {
      refetch();
    }
  };

  const handleCloseModal = () => {
    refetch();
    setOpenModal(false);
  };

  const handleSaveBenefits = () => {
    setMessage({ msg: "Funcionário cadastrado com seus benefícios com sucesso!!", status: 'success' });
    refetch();
    handleCloseModal();
  };

  useEffect(() => {
    if (message.msg) {
      const timer = setTimeout(() => {
        navigate('/');
        setMessage({ msg: '', status: '' });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleRefresh = () => {
    setSearch("");
    setSearchData(null);
    refetch();
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Não foi possível exibir os beneficiários: {error.message}</div>;

  return (
    <Paper className="w-full overflow-hidden">
      <SearchBar onChange={handleFilterChange} onRefresh={handleRefresh} />

      <Typography
        variant="h6"
        id="tableTitle"
        component="div"
        className="pl-4 pb-5 flex-auto text-center"
      >
        Beneficiários cadastrados
      </Typography>

      <EmployeeTable 
        employees={data || searchData} 
        openCollapse={openCollapse} 
        setOpenCollapse={setOpenCollapse} 
        setOpenModal={setOpenModal} 
        setEmployeeId={setEmployeeId} 
      />

      <TablePagination
        component="div"
        count={-1}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Linhas por página"
        labelDisplayedRows={() => ''}
      />


      <MessageAlert message={message}/>

      <GenericModal
        open={openModal}
        onClose={handleCloseModal}
        title="Selecione os benefícios"
        content={<BenefitSelection employeeId={employeeId} onSave={handleSaveBenefits} />}
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
