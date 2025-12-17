const PROGRAM_CATEGORIES = {
  VOLUNTEER: 'Volunteer Programs',
  WORK_EXCHANGE: 'Work Exchange Stays',
  DIGITAL_NOMAD: 'Digital Nomad Stays',
  RURAL_HOMESTAY: 'Rural Homestays',
  ECO_PROJECTS: 'Eco Projects',
  CULTURAL: 'Cultural Experiences'
};

const VOLUNTEER_SUBCATEGORIES = [
  'Education Support',
  'Women Empowerment',
  'Environment & Climate',
  'Animal Care',
  'Community Development',
  'Rural Development',
  'Weekend Volunteering'
];

const CULTURAL_SUBCATEGORIES = [
  'Village homestays',
  'Tribal life',
  'Yoga & meditation',
  'Food trails',
  'Art & craft workshops'
];

// Map categories to their subcategories
const CATEGORY_SUBCATEGORIES = {
  [PROGRAM_CATEGORIES.VOLUNTEER]: VOLUNTEER_SUBCATEGORIES,
  [PROGRAM_CATEGORIES.CULTURAL]: CULTURAL_SUBCATEGORIES,
  // Other categories don't have subcategories
  [PROGRAM_CATEGORIES.WORK_EXCHANGE]: [],
  [PROGRAM_CATEGORIES.DIGITAL_NOMAD]: [],
  [PROGRAM_CATEGORIES.RURAL_HOMESTAY]: [],
  [PROGRAM_CATEGORIES.ECO_PROJECTS]: []
};

module.exports = {
  PROGRAM_CATEGORIES,
  VOLUNTEER_SUBCATEGORIES,
  CULTURAL_SUBCATEGORIES,
  CATEGORY_SUBCATEGORIES
};