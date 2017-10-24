import React from 'react';
import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import Spinning from 'grommet/components/icons/Spinning';

export default () => (
  <Article pad="none" full="vertical" direction="column">
    <Box
      flex={true}
      full={false}
      margin="small"
      align="center"
      justify="center"
    >
      <Spinning size="medium" />
    </Box>
  </Article>
);
