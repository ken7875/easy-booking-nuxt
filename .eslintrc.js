module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:prettier/recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'plugin:nuxt/recommended',
    'vitest'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'vue/multi-word-component-names': 0, // Nuxt3 有一些元件都會是單一名稱，例如404，所以最好是關掉
    'vue/singleline-html-element-content-newline': 0, // 這條開啟會限制 html 標籤有內容就換行，如果很短實在沒必要特別換行
    'vue/require-default-prop': 0, // 要求 props 要有預設值
    'prettier/prettier': [
      'error',
      {
        printWidth: 120, // 看公司給的螢幕多大
        tabWidth: 2, // 建議tab都是2個空格寬
        singleQuote: true, // 古早時都用雙引號，但現在習慣單引號
        semi: true, // 看個人或團隊習慣，古早時JS一定要結尾分號
        trailingComma: 'none' // 結尾逗號
      }
    ]
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue']
      }
    }
  }
};
