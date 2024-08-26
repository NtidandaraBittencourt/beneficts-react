import React from 'react';
import { Button, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GenericModal from '../Generics/GenericModal';
import BenefitSelection from '../BenefitSelection';

const BenefitModal = ({ open, onClose, onSave, employeeId, setSelectedBenefits }) => {
  return (
    <GenericModal
      open={open}
      onClose={onClose}
      title="Selecione os Benefícios"
      aria-labelledby="benefit-modal-title"
      aria-describedby="benefit-modal-description"
      content={
        <Box>
          <BenefitSelection
            employeeId={employeeId}
            onSelectionChange={setSelectedBenefits}
          />
        </Box>
      }
      actions={
        <Button
          onClick={onSave}
          color="primary"
          variant="contained"
        >
          Salvar Benefícios
        </Button>
      }
    />
  );
};

export default BenefitModal;