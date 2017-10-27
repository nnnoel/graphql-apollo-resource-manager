import React, { Component } from 'react';
import Select from 'grommet/components/Select';

class SelectDrop extends Component {
  state = {
    [this.props.keyName]: { label: '', value: '' }
  };

  handleChange = ({ value }) => {
    this.setState({ [this.props.keyName]: value }, () =>
      this.props.onChange(this.state)
    );
  };

  render() {
    const { keyName, options, placeHolder, value, ...rest } = this.props;

    return (
      <Select
        {...rest}
        className="program-select-dropdown"
        placeHolder={placeHolder}
        inline={false}
        options={options}
        onChange={this.handleChange}
        value={this.props.value}
      />
    );
  }
}

export default SelectDrop;
