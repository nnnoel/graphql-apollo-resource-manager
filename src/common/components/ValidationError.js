import React from 'react';
import Box from 'grommet/components/Box';

const ValidationError = ({ children }) => (
  <Box>
    <span style={{ color: '#ff324d' }}>{children}</span>
  </Box>
);

export default ValidationError;
