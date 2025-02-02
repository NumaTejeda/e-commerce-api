module.exports = [
  {
    files: ['**/*.js'],
    ignores: [
      '**/*.config.js',
      '!**/cloudinary.config.js*',
      'node_modules',
      '.vscode',
    ],
    rules: {
      semi: 'error',
      'prefer-const': 'error',
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      quotes: ['error', 'single'],
      indent: ['error', 2],
      'comma-dangle': ['error', 'always-multiline'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
    },
  },
];
