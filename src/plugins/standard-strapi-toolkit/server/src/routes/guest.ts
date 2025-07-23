export default [
  {
    method: 'GET',
    path: '/guest/test',
    handler: 'guest.test',
    config: {
      auth: false,
    },
  },
];
