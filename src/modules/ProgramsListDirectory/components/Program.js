import React, { Component } from 'react';

import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import Anchor from 'grommet/components/Anchor';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import Animate from 'grommet/components/Animate';

import InfoLine from '../views/InfoLine';

const selectedOptions = {
  online: 'Online',
  inperson: 'In Person',
  days: 'Days only',
  nights: 'Nights only',
  weekends: 'Weekends only',
  lt6: 'Less than 6 months',
  gt6: 'More than 6 months',
  free: 'Free',
  lt5000: 'Less than $5000',
  gt5000: 'More than $5000',
  child: 'Child (<13)',
  teen: 'Teenager (13-19)',
  older: 'Older (20+)'
};

class Program extends Component {
  state = {
    showMoreInfo: false
  };

  render() {
    return (
      <Box colorIndex="light-1">
        <Box margin={{ vertical: 'medium' }} direction="row">
          <Box separator="right" colorIndex="light-2" pad="medium" basis="1/2">
            {/* left */}
            <Box margin={{ vertical: 'small' }}>
              <Heading tag="h3" margin="none" strong={true}>
                {this.props.name}
              </Heading>
            </Box>

            <Box margin={{ vertical: 'small' }}>
              <Heading tag="h4" margin="none" strong={true}>
                Description:
              </Heading>
              <Paragraph margin="none">{this.props.description}</Paragraph>
            </Box>

            <InfoLine head="Website:">
              <Anchor>{this.props.website}</Anchor>
            </InfoLine>

            <InfoLine head="Other Contact Info:">
              <Paragraph margin="none">
                {this.props.contactName} <br />
                {this.props.email} <br />
                {this.props.phoneNumber} <br />
              </Paragraph>
            </InfoLine>

            {/* break here */}
            <Animate
              visible={this.state.showMoreInfo}
              enter={{ animation: 'fade', duration: 300, delay: 0 }}
              leave={{ animation: 'fade', duration: 300, delay: 0 }}
              pad="none"
              margin="none"
            >
              <InfoLine head="County:">
                <Paragraph margin="none">{this.props.county}</Paragraph>
              </InfoLine>

              <InfoLine head="Location:">
                <Paragraph margin="none">{this.props.location}</Paragraph>
              </InfoLine>

              <InfoLine head="Age Range:">
                <Paragraph margin="none">
                  {selectedOptions[this.props.ageRange]}
                </Paragraph>
              </InfoLine>

              <InfoLine head="Time length:">
                <Paragraph margin="none">
                  {selectedOptions[this.props.timeLength]}
                </Paragraph>
              </InfoLine>
            </Animate>
          </Box>

          <Box colorIndex="light-2" pad="medium" basis="1/2">
            {/* right */}

            <InfoLine head="Affiliations:">
              <Paragraph margin="none">{this.props.affiliations}</Paragraph>
            </InfoLine>

            <InfoLine head="Certifications:">
              <Paragraph margin="none">{this.props.certification}</Paragraph>
            </InfoLine>

            <InfoLine head="Partners:">
              <Paragraph margin="none">{this.props.partners}</Paragraph>
            </InfoLine>

            {/* break here */}
            <Animate
              visible={this.state.showMoreInfo}
              enter={{ animation: 'fade', duration: 300, delay: 0 }}
              leave={{ animation: 'fade', duration: 300, delay: 0 }}
              keep={false}
              pad="none"
              margin="none"
            >
              <InfoLine head="Time of day:">
                <Paragraph margin="none">
                  {selectedOptions[this.props.timeOfDay]}
                </Paragraph>
              </InfoLine>
              <InfoLine head="Scholarships:">
                <Paragraph margin="none">{this.props.scholarships}</Paragraph>
              </InfoLine>

              <InfoLine head="Online or in person:">
                <Paragraph margin="none">
                  {selectedOptions[this.props.takesPlace]}
                </Paragraph>
              </InfoLine>

              <InfoLine head="Avg number of participants:">
                <Paragraph margin="none">{this.props.size}</Paragraph>
              </InfoLine>

              <InfoLine head="Cost:">
                <Paragraph margin="none">
                  {selectedOptions[this.props.cost]}
                </Paragraph>
              </InfoLine>

              <InfoLine head="How success is measured:">
                <Paragraph margin="none">
                  {this.props.measuredSuccess}
                </Paragraph>
              </InfoLine>

              <InfoLine head="Past Successes:">
                <Paragraph margin="none">{this.props.pastSuccess}</Paragraph>
              </InfoLine>
            </Animate>

            <Box direction="row" alignSelf="end" margin={{ vertical: 'small' }}>
              <Button
                label={
                  this.state.showMoreInfo
                    ? 'View Less Information'
                    : 'View More Information'
                }
                primary={true}
                onClick={() => {
                  this.setState(prevState => ({
                    showMoreInfo: !prevState.showMoreInfo
                  }));
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Program;
