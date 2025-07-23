export default [
  {
    method: 'GET',
    path: '/landing',
    handler: 'landing.index',
    config: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/landing/team-members',
    handler: 'landing.teamMembers',
    config: {
      auth: false,
    },
  },
];
