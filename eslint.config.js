const nextVitals = require('eslint-config-next/core-web-vitals');

module.exports = [
  ...nextVitals,
  {
    rules: {
      'react-hooks/immutability': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
];
