export const PROGRAM_CATEGORIES = {
  VOLUNTEER: 'Volunteer Programs',
  WORK_EXCHANGE: 'Work Exchange Stays',
  DIGITAL_NOMAD: 'Digital Nomad Stays',
  RURAL_HOMESTAY: 'Rural Homestays',
  ECO_PROJECTS: 'Eco Projects',
  CULTURAL: 'Cultural Experiences'
};

export const VOLUNTEER_SUBCATEGORIES = [
  'Education Support',
  'Women Empowerment',
  'Environment & Climate',
  'Animal Care',
  'Community Development',
  'Rural Development',
  'Weekend Volunteering'
];

export const CULTURAL_SUBCATEGORIES = [
  'Village homestays',
  'Tribal life',
  'Yoga & meditation',
  'Food trails',
  'Art & craft workshops'
];

export const CATEGORY_SUBCATEGORIES = {
  [PROGRAM_CATEGORIES.VOLUNTEER]: VOLUNTEER_SUBCATEGORIES,
  [PROGRAM_CATEGORIES.CULTURAL]: CULTURAL_SUBCATEGORIES,
  [PROGRAM_CATEGORIES.WORK_EXCHANGE]: [],
  [PROGRAM_CATEGORIES.DIGITAL_NOMAD]: [],
  [PROGRAM_CATEGORIES.RURAL_HOMESTAY]: [],
  [PROGRAM_CATEGORIES.ECO_PROJECTS]: []
};

export const CATEGORY_SLUGS = {
  'Volunteer Programs': 'volunteer',
  'Work Exchange Stays': 'work-exchange',
  'Digital Nomad Stays': 'digital-nomad',
  'Rural Homestays': 'rural-homestays',
  'Eco Projects': 'eco-projects',
  'Cultural Experiences': 'cultural'
};