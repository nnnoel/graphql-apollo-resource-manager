import { gql } from 'react-apollo';

export const createProgramMutation = gql`
  mutation CreateProgram($input: CreateProgramInput) {
    createProgram(input: $input) {
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
