import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export const fetchEmployees = async (search, page = 1, rowsPerPage = 5) => {
  const response = await api.get('/employees', {
    params: { 
      cpf: search,
      _page: page,
      _limit: rowsPerPage,
      _sort:'name',
      _order: 'asc',
    },
  });
  return response.data;
}

export default api;
