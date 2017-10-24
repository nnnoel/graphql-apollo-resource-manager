import React from 'react';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import { LoginForm } from '../components';

export default () => (
  <Article pad="none" full="vertical" direction="column">
    <Box
      flex={true}
      full={false}
      margin="small"
      align="center"
      justify="center"
    >
      <LoginForm />
    </Box>
  </Article>
);
