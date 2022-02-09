### [Dev hint site](https://devhints.iohttps://devhints.io)
### [ES2015+ cheatsheet](https://devhints.io/es6)

### src 디렉토리 '' set 
tsconfig.json 변경
```json
{
  "compilerOptions": {
    // 생략
    "rootDirs": ["."],
    "baseUrl": "src",
    "paths": {
	    "": ["./*"]
    }
  },
```
storybook plugin package install
```shell
yarn add -D tsconfig-paths-webpack-plugin
```
storybook main.js
```js
// 주가
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/preset-create-react-app'],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5'
  },
  // 추가
  webpackFinal: async (config) => {
    config.resolve.plugins.push(new TsconfigPathsPlugin({}));
    return config;
  }
};
```
### typescript에서 .svg, module.css, module.scss 사용 : src/custom.d.ts
```ts
declare module '*.svg' {
	const content: any;
	export default content;
}
// scss 사용을 위해 : yarn add node-sass -D 추가
declare module '*.module.scss' {
	const value: Record<string, string>;
	export default value;
}
declare module '*.module.css' {
	const value: Record<string, string>;
	export default value;
}
```

### storybook 사용
```shell
# global install
npm install -g @storybook/cli
# project에 storybook add
npx -p @storybook/cli sb init
```

### webstorm =>  ESLint: Specify a path to the 'eslint' package 메세지 삭제
```shell
1. npm install -g eslint
2. Make sure that the ES Lint settings are set to Automatic ES Lint Configuration
3. restart webstorm
```

### [typescript 에러 참조](https://velog.io/@edie_ko/React-TypeScript-JavaScript에서-TypeScript로-변환-에러-선물-세트)

### Type of property 'defaultProps' circularly references itself in mapped type 에러
```shell
yarn upgrade @types/styled-components --latest
# or
npm install @types/styled-components@latest
```

###  You are currently running a version of TypeScript which is not officially supported by 에러
```json
// .eslintrc.json

"parserOptions": {
    "warnOnUnsupportedTypeScriptVersion": false
},
```

### ESLint: Missing return type on function.(@typescript-eslint/explicit-module-boundary-types) 에러
```json
// .eslintrc.json
"rules": {
    // disable the rule for all files
    "@typescript-eslint/explicit-module-boundary-types": "off"
  },
  "overrides": [
    {
      // enable the rule specifically for TypeScript files
      "files": ["*.ts", "*.tsx"],
      "rules": {
        "@typescript-eslint/explicit-module-boundary-types": ["error"]
      }
    }
  ]
  ```
