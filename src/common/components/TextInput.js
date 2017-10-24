import React, { PureComponent } from 'react';
import { Control, Errors } from 'react-redux-form';
import ValidationError from './ValidationError';
import FormField from 'grommet/components/FormField';
import Box from 'grommet/components/Box';

class TextInput extends PureComponent {
  render() {
    const {
      id,
      label,
      model,
      messages,
      validators,
      disabled,
      ...rest
    } = this.props;
    return (
      <Box pad="small">
        <FormField htmlFor={id} label={label}>
          <Control.text
            {...rest}
            model={model}
            id={id}
            validators={validators}
            disabled={disabled}
          />
        </FormField>
        <Errors
          model={model}
          component={ValidationError}
          show={{ submitFailed: true }}
          messages={messages}
        />
      </Box>
    );
  }
}

export default TextInput;
