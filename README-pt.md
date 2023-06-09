# DrummondForms

### Proposta: Cadastro de forms!

## 1) O que foi utilizado?

- Monorepo (Yarn workspaces) - https://classic.yarnpkg.com/lang/en/docs/workspaces/
- NestJS - https://nestjs.com/
- MongoDB - https://www.mongodb.com/
- React JS - https://pt-br.reactjs.org/
- Lerna - https://lerna.js.org/
- Vite - https://vitejs.dev/
- Firebase - https://firebase.google.com/?hl=pt-br
- Swagger - https://swagger.io/
- MUI - https://mui.com/
- Github Actions - https://github.com/features/actions
- Playwright - https://playwright.dev/

## 2) Demonstração

### 2.1) Sign In Page (Firebase Auth)

[![N|Solid](https://i.imgur.com/sI615as.jpg)](https://nodesource.com/products/nsolid)

### 2.2) Sign Up Page (Firebase Auth)

[![N|Solid](https://i.imgur.com/tRIRJcH.jpg)](https://nodesource.com/products/nsolid)

### 2.3) Register Form Page 

[![N|Solid](https://i.imgur.com/8D9wCmQ.jpg)](https://nodesource.com/products/nsolid)
[![N|Solid](https://i.imgur.com/ldzoRRc.jpg)](https://nodesource.com/products/nsolid)

### 2.4) Swagger API

[![N|Solid](https://i.imgur.com/XlObMPA.jpg)](https://nodesource.com/products/nsolid)

## 3) Instalação 

### 3.1) Entre na raiz do projeto e rode "yarn" para iniciar a instalação das dependências do projeto padrão.

```sh
yarn
```

### 3.2) Entre no projeto "web" para iniciar a instalação das dependências do projeto.

```sh
cd packages/web
yarn
```

### 3.3) Entre no projeto "api" para iniciar a instalação das dependências do projeto.

```sh
cd packages/api
yarn
```

### 3.4) Agora é possível executar todas as pastas do diretório padrão.

```sh
yarn api -> Executa a API.
yarn apidev -> Executa a API em ambiente de desenvolvimento.
yarn web -> Executa o WEB
```

### 3.5) Crie um env na raiz do projeto web para acesso a API com o seguinte:

```sh
VITE_API_URL = http://localhost:3000
VITE_FIREBASE_API_KEY = AIzaSyDceH9amyB2Var1mFx0GqMO1o1bt7E_fbY
VITE_FIREBASE_AUTH_DOMAIN = drummond-e8706.firebaseapp.com
VITE_FIREBASE_PROJECT_ID = drummond-e8706
VITE_FIREBASE_STORAGE_BUCKET = drummond-e8706.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID = 279886335338
VITE_FIREBASE_MESSAGING_APPID = 1:279886335338:web:d220d616dc14bdc2ac6913
VITE_FIREBASE_MESSAGING_MEASUREMENT_ID = G-N8LKHKK1NE
```

### 3.6) Crie um env na raiz do projeto api para acesso ao database com o seguinte:

```sh
DATABASE_CONNECTION_STRING = mongodb+srv://qmguiziii:1234@cluster0.41qxb82.mongodb.net/test
```
