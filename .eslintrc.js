module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: "airbnb",
  plugins: [
    "react",
    "jsx-a11y",
    "import"
  ],
  rules: {
    // 0 = off, 1 = warn, 2 = error
    // FB配置参考：
    // https://github.com/facebook/react-native/blob/8baaad9b0fbda2b02bb1834452aa63cac7910dc5/.eslintrc

    "global-require": 0,
    "no-use-before-define": 0,
    "no-console": 0,
    "no-undef": 2,
    "no-plusplus":0,
    "no-unused-vars": 0,
    "block-scoped-var": 0,
    "complexity": 0,
    "consistent-return": 0,

    // allow async-await
    'generator-star-spacing': 0,
    "no-return-assign": 1,
    "react/jsx-filename-extension": 0,
    "react/self-closing-comp": 1,
    "react/jsx-closing-bracket-location": 0,
    "react/prop-types": 0, // 避免redux等注入属性的情况
    "react/react-in-jsx-scope":0, //因已经引入react-require插件，会自动补上React

    "linebreak-style": ["error", "windows"],
    "arrow-parens": 0,
    "babel/semi": 0,
    "global-require": 0,
    "import/prefer-default-export": 0,
    "no-mixed-operators": 0,
    "radix": 0,
    "semi": [2, "never"],
    "react/no-array-index-key": 0,
    "no-underscore-dangle": 0,
    "import/extensions": 0,
    "max-len": ["error", 180],
    "class-methods-use-this": 0,
    "react/no-multi-comp":0, //Declare only one React component per file
    "react/no-string-refs": 1,
  },

  // 这里设置可能用到的全局变量
  "globals": {
    "window": true,
    "fetch": true,
    "__DEV__": true,
    "__APP__": true,
    "__ANDROID__": true,
    "__IOS__": true
  }
};