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
