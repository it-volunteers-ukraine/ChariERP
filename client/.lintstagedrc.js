module.exports = {
  '**/*.{js,jsx,ts,tsx,css,md,json}': (files) => [
    `npx prettier --write ${files.join(' ')}`,
    `npx eslint --fix ${files.join(' ')}`,
  ],
};
