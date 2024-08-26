import React from 'react';
import { Grid, TextField } from '@mui/material';
import InputMask from 'react-input-mask';

const EmployeeFields = ({ formik }) => (
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
        fullWidth
        size="small"
        value={formik.values.address}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        variant="outlined"
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
        InputLabelProps={{ shrink: true }}
        error={formik.touched.dtAdmission && !!formik.errors.dtAdmission}
        helperText={formik.touched.dtAdmission && formik.errors.dtAdmission}
      />
    </Grid>
    <Grid container spacing={3} className='pt-6 pl-6'>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Peso (kg)"
          name="weight"
          type="number"
          fullWidth
          size="small"
          value={formik.values.weight}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          variant="outlined"
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
        error={formik.touched.hoursMeditated && !!formik.errors.hoursMeditated}
        helperText={formik.touched.hoursMeditated && formik.errors.hoursMeditated}
      />
    </Grid>
  </Grid>
);

export default EmployeeFields;
