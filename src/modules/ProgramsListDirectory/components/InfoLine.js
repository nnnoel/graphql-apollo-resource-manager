import React from 'react';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';

export default ({ head, children }) => (
  <Box margin={{ vertical: 'small' }}>
    <Heading tag="h4" margin="none" strong={true}>
      {head}
    </Heading>
    {children}
  </Box>
);
