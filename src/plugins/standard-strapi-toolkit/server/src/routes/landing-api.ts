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
  {
    method: 'GET',
    path: '/landing/articles',
    handler: 'landing.articles',
    config: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/landing/articles/:slug',
    handler: 'landing.articleDetail',
    config: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/landing/books',
    handler: 'landing.books',
    config: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/landing/books/:slug',
    handler: 'landing.bookDetail',
    config: {
      auth: false,
    },
  },
];
