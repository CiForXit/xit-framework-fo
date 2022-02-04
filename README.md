### src 디렉토리 set : jsconfig.json or tsconfig.json
```json
"compilerOptions": {
    "compilerOptions": {
      "baseUrl": "src"
    },
    "includes": ["src"],
```

### typescript에서 .svg 사용 : src/custom.d.ts
```ts
declare module '*.svg' {
  const content: any;
  export default content;
}
```

### webstorm =>  ESLint: Specify a path to the 'eslint' package 메세지 삭제
```shell
1. npm install --g eslint
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

### TS2794: Expected 1 arguments, but got 0. Did you forget to include 'void' in your type argument to 'Promise'? 에러
```js
await new Promise(resolve => {
==> await new Promise<void>(resolve => {  // Generic add
```

### Rules with suggestions must set the `meta.hasSuggestions` property to `true` 에러
```shell
npm install -D --legacy-peer-deps eslint-plugin-react-hooks@next
```