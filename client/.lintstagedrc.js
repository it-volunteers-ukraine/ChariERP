module.exports = {
  '**/*.{js,jsx,ts,tsx,css,md,json}': () => ['npm run compile', 'npm run format', 'npm run lint'],
};
