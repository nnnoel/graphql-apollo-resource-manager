import { uniqueId, random, times } from 'lodash';

export const ProgramMock = {
  id: uniqueId('program:'),
  name: 'asdf',
  description: 'asdf',
  website: 'asdf',
  contactName: 'asdf',
  email: 'asdf',
  phoneNumber: 'asdf',
  cost: 'asdf',
  size: 'asdf',
  location: 'asdf',
  county: 'asdf',
  ageRange: 'asdf',
  affiliations: 'asdf',
  timeOfDay: 'asdf',
  timeLength: 'asdf',
  certification: 'asdf',
  partners: 'asdf',
  scholarships: 'asdf',
  takesPlace: 'asdf',
  measuredSuccess: 'asdf',
  pastSuccess: 'asdf',
  pending: false
};

export const generateRandomMockData = () =>
  times(random(10, 50), () => ({ ...ProgramMock, id: uniqueId('program:') }));
