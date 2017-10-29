import gql from 'graphql-tag';

export const updateProgramMutation = gql`
  mutation UpdateProgram($input: UpdateProgramInput) {
    updateProgram(input: $input) {
      id
      name
      description
      website
      contactName
      email
      phoneNumber
      cost
      size
      location
      county
      ageRange
      affiliations
      timeOfDay
      timeLength
      certification
      partners
      scholarships
      takesPlace
      measuredSuccess
      pastSuccess
      pending
    }
  }
`;
