import React from 'react';
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Article';
import Status from 'grommet/components/icons/Status';

export default ({ message, onClick }) => (
  <Article pad="none" full="vertical" direction="column">
    <Box
      flex={true}
      full={false}
      margin="small"
      align="center"
      justify="center"
    >
      <Status value="critical" size="medium" />{' '}
      <Anchor onClick={onClick}>{message}</Anchor>
    </Box>
  </Article>
);
