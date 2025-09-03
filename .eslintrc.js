module.exports = {
  env: {
    node: true,
    es2021: true
  },
  extends: [
    'airbnb-base'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-console': 'off', // permite console.log (útil em API)
    'class-methods-use-this': 'off', // não obriga usar "this" em classes
    'import/prefer-default-export': 'off', // permite exportar só funções nomeadas
    'comma-dangle': ['error', 'never'], // remove vírgula no fim de objetos/arrays
    'import/no-extraneous-dependencies': 'off',
    'import/first': 'off'
  }
};
