const { off } = require('screenfull')

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    // 解决eslint与prettier的冲突
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 'off',
    'vue/no-export-in-script-setup': 'off',
    'vue/valid-v-slot': 'warn',
    'no-unused-vars': 'warn',
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['index'] //需要忽略的组件名
      }
    ]
  }
}
