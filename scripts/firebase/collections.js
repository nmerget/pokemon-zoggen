export default [
  {
    name: 'runs',
  },
  {
    name: 'users',
    sub: [
      {
        name: 'run-groups',
        sub: [{ name: 'runs' }],
      },
    ],
  },
  {
    name: 'current',
  },
  {
    name: 'run-groups',
  },
];
