import * as yup from 'yup';

const employeeSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório').min(3, 'Nome deve ter pelo menos 3 caracteres'),
  cpf: yup.string().required("Prenche com um CPF válido").matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF deve estar no formato 999.999.999-99'),
  email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
  dtAdmission: yup.date().required('Data de admissão é obrigatória'),
  address: yup.string().required('Endereço é obrigatório'),
  weight: yup.number().required('Peso é obrigatório').positive('Peso deve ser um número positivo'),
  height: yup.number().required('Altura é obrigatória').positive('Altura deve ser um número positivo'),
  hoursMeditated: yup.number().required('Horas meditadas são obrigatórias').min(0, 'Horas meditadas deve ser um número não negativo'),
});

export default employeeSchema
