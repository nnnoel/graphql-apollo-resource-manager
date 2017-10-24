import { gql } from 'react-apollo';

export const getProgramsQuery = gql`
  query GetPrograms($input: GetProgramsInput, $first: Int!, $skip: Int!) {
    programs(input: $input, first: $first, skip: $skip) {
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
    _programsMeta(input: $input) {
      totalCount
    }
  }
`;
