import React, { Component } from 'react';
import TextInput from './TextInput';
import TextareaInput from './TextareaInput';
import SelectInput from './SelectInput';
import { required, email, minLength, url, phone } from '../formValidators';
import { LocalForm } from 'react-redux-form';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';

// Re-useable Form
class ProgramForm extends Component {
  handleSubmit = formBody => {
    this.props.onFormSubmit(formBody);
  };

  handleDelete = () => {
    //eslint-disable-next-line
    const conf = confirm(
      'You are about to delete this program. Click OK to continue.'
    );
    if (conf) {
      this.props.onFormDelete({ id: this.props.formBody.id });
    }
  };

  render() {
    return (
      <LocalForm
        initialState={this.props.formBody}
        onSubmit={this.handleSubmit}
        style={{
          width: '60%'
        }}
      >
        <Box style={{ width: '100%' }} direction="row" justify="center">
          <Box direction="column" style={{ width: '100%' }}>
            <TextInput
              id="name"
              label="Name"
              model=".name"
              validators={{
                required
              }}
              messages={{
                required: 'Program name is required'
              }}
              disabled={this.props.disabled}
            />

            <TextareaInput
              id="description"
              label="Description"
              model=".description"
              validators={{
                required,
                minLength: minLength(10)
              }}
              messages={{
                required: 'Program description is required',
                minLength: 'Should have at least 10 characters'
              }}
              disabled={this.props.disabled}
            />

            <SelectInput
              id="cost"
              label="Cost"
              model=".cost"
              options={[
                { label: 'Free', value: 'free' },
                {
                  label: 'Less than $5000',
                  value: 'lt5000'
                },
                { label: 'More than $5000', value: 'gt5000' }
              ]}
              disabled={this.props.disabled}
            />

            <TextInput
              id="size"
              label="Average Size"
              model=".size"
              disabled={this.props.disabled}
            />

            <TextInput id="county" label="County" model=".county" />
            <SelectInput
              id="ageRange"
              label="Age Range"
              model=".ageRange"
              options={[
                { label: 'Child (<13)', value: 'child' },
                {
                  label: 'Teenager (13-19)',
                  value: 'teen'
                },
                { label: 'Older (20+)', value: 'older' }
              ]}
              disabled={this.props.disabled}
            />

            <TextInput
              id="affiliations"
              label="Affiliations"
              model=".affiliations"
              disabled={this.props.disabled}
            />
            <SelectInput
              id="timeOfDay"
              label="Time of day"
              model=".timeOfDay"
              options={[
                { label: 'Days only', value: 'days' },
                {
                  label: 'Nights only',
                  value: 'nights'
                },
                {
                  label: 'Weekends only',
                  value: 'weekends'
                }
              ]}
              disabled={this.props.disabled}
            />
            <TextInput
              id="measuredSuccess"
              label="Measure of Success"
              model=".measuredSuccess"
              disabled={this.props.disabled}
            />
          </Box>

          <Box direction="column" style={{ width: '100%' }}>
            <TextInput
              id="contactName"
              label="Contact Name"
              model=".contactName"
              validators={{
                required
              }}
              messages={{
                required: 'Contact name required'
              }}
              disabled={this.props.disabled}
            />
            <TextInput
              id="email"
              label="Email"
              model=".email"
              validators={{
                required,
                email
              }}
              messages={{
                required: 'A contact email is required',
                email: 'Must be a valid email address'
              }}
              disabled={this.props.disabled}
            />

            <TextInput
              id="phoneNumber"
              label="Phone Number"
              model=".phoneNumber"
              validators={{
                required,
                phone
              }}
              messages={{
                required: 'A contact phone number is required',
                phone: 'Must be a valid phone number'
              }}
              disabled={this.props.disabled}
            />

            <TextInput
              id="website"
              label="Website"
              model=".website"
              validators={{
                url
              }}
              messages={{
                url: 'Website needs to be a valid url'
              }}
              disabled={this.props.disabled}
            />
            <SelectInput
              id="timeLength"
              label="Time length"
              model=".timeLength"
              options={[
                {
                  label: 'Less than 6 months',
                  value: 'lt6'
                },
                {
                  label: 'More than 6 months',
                  value: 'gt6'
                }
              ]}
              disabled={this.props.disabled}
            />
            <TextInput
              id="certification"
              label="Certification"
              model=".certification"
            />

            <TextInput id="partners" label="Partners" model=".partners" />

            <TextInput
              id="scholarships"
              label="Scholarships"
              model=".scholarships"
              disabled={this.props.disabled}
            />

            <SelectInput
              id="takesPlace"
              label="Online or in person"
              model=".takesPlace"
              options={[
                { label: 'Online', value: 'online' },
                {
                  label: 'In Person',
                  value: 'inperson'
                }
              ]}
              disabled={this.props.disabled}
            />
            <TextInput
              id="pastSuccess"
              label="Past Success"
              model=".pastSuccess"
              disabled={this.props.disabled}
            />
          </Box>
        </Box>
        <Footer
          pad={{
            horizontal: 'medium',
            vertical: 'medium',
            between: 'medium'
          }}
          justify="center"
        >
          {this.props.disabled ? (
            <Button primary={true} label={`${this.props.buttonName} Program`} />
          ) : (
            <Button
              type="submit"
              primary={true}
              label={`${this.props.buttonName} Program`}
            />
          )}
          {this.props.onFormDelete &&
            (this.props.disabled ? (
              <Button label="Delete Program" critical={true} />
            ) : (
              <Button
                label="Delete Program"
                onClick={this.handleDelete}
                critical={true}
              />
            ))}
        </Footer>
      </LocalForm>
    );
  }
}

export default ProgramForm;
