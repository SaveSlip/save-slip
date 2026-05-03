const config = {
  "*.{ts,tsx,mjs,mts,js}": ["eslint --fix", "prettier --write"],
  "*.{json,css,md}": ["prettier --write"],
  // tsc does project-wide type checking — pass no filenames so it uses tsconfig.json
  "*.{ts,tsx}": () => "tsc --noEmit",
};

export default config;
