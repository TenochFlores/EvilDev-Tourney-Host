import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [tipoCuentaState, setTipoCuentaState] = React.useState('');

  const handleChange = (event) => {
    setTipoCuentaState(event.target.value);
  };

  return (
    <Box sx={{minWidth: 120}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Tipo de Cuenta</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tipoCuentaState}
          label="tipo_cuenta"
          onChange={handleChange}
        >
          <MenuItem value={'super'}>Super administrador</MenuItem>
          <MenuItem value={'admin'}>Administrador</MenuItem>
          <MenuItem value={'user'}>Participante</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}