export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const EDUCATION_LEVELS = [
  'B.Tech', 'B.E', 'BCA', 'MCA', 'M.Tech', 'B.Com', 'BBA', 'MBA', 
  'CA', 'M.Com', 'MBBS', 'B.Pharma', 'BDS', 'BAMS', 'B.Sc Nursing',
  'BSc', 'B.Sc Agriculture', 'B.Tech Agricultural', 'M.Sc Agriculture',
  'B.Ed', 'M.Ed', 'BA', 'MA', 'MSc', 'Diploma', 'ITI', 'Mass Communication'
];

export const SECTORS = [
  'Technology', 'Finance', 'Healthcare', 'Agriculture', 
  'Marketing', 'Manufacturing', 'Education'
];

export const MAX_SKILLS = 10;
export const MAX_RESULTS = 10;