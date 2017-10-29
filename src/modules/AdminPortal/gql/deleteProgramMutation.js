import gql from 'graphql-tag';

export const deleteProgramMutation = gql`
  mutation DeleteProgram($id: ID!) {
    deleteProgram(id: $id) {
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
