import gql from 'graphql-tag';

export const getProgramQuery = gql`
  query GetProgram($id: ID!) {
    program(id: $id) {
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
