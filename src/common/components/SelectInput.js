import React, { PureComponent } from 'react';
import { Control, Errors } from 'react-redux-form';
import ValidationError from './ValidationError';
import FormField from 'grommet/components/FormField';
import Box from 'grommet/components/Box';

class SelectInput extends PureComponent {
  render() {
    const {
      id,
      label,
      model,
      messages,
      validators,
      options,
      disabled,
      ...rest
    } = this.props;
    return (
      <Box pad="small">
        <FormField htmlFor={id} label={label}>
          <Control.select
            {...rest}
            model={model}
            id={id}
            validators={validators}
            disabled={disabled}
          >
            <option value="" />
            {options.map(({ value, label }, index) => (
              <option key={index} value={value}>
                {label}
              </option>
            ))}
          </Control.select>
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

export default SelectInput;
