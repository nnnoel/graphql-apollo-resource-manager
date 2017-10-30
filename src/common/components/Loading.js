import React from 'react';
import Box from 'grommet/components/Box';
import Spinning from 'grommet/components/icons/Spinning';

export default () => (
  <Box
    tag="article"
    id="loading-spinner"
    margin="small"
    pad="none"
    full="vertical"
    direction="column"
    justify="center"
    align="center"
  >
    <Spinning size="large" />
  </Box>
);
