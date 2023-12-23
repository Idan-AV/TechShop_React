import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircleProgress() {
  return (
    <Box sx={{ display: 'flex',
    justifyContent: 'center',
      alignItems: 'center', // Add this line for vertical centering
      height: '100vh'}}>
      <CircularProgress />
    </Box>
  );
}
