# DrummondForms
### Proposta: Cadastro de forms!

## 1) O que foi utilizado?
- Monorepo (Yarn workspaces)
- NestJS
- MongoDB
- React JS

## Demonstração
### 1) Sign In Page
[![N|Solid](https://i.imgur.com/sI615as.jpg)](https://nodesource.com/products/nsolid)
### 2) Sign Up Page
[![N|Solid](https://i.imgur.com/tRIRJcH.jpg)](https://nodesource.com/products/nsolid)
### 3) Register Form Page
[![N|Solid](https://i.imgur.com/8D9wCmQ.jpg)](https://nodesource.com/products/nsolid)
[![N|Solid](https://i.imgur.com/ldzoRRc.jpg)](https://nodesource.com/products/nsolid)

### 4) Swagger API
[![N|Solid](https://i.imgur.com/XlObMPA.jpg)](https://nodesource.com/products/nsolid)
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

### 1) Entre na raiz do projeto e rode "yarn" para iniciar a instalação das dependências do projeto padrão.

```sh
yarn 
```
### 2) Entre no projeto "web" para iniciar a instalação das dependências do projeto.

```sh
cd packages/web
yarn 
```

### 3) Entre no projeto "api" para iniciar a instalação das dependências do projeto.

```sh
cd packages/api
yarn 
```

### 4) Agora é possível executar todas as pastas do diretório padrão.

```sh
yarn api -> Executa a API.
yarn apidev -> Executa a API em ambiente de desenvolvimento.
yarn web -> Executa o WEB
```

### 5) Crie um env na raiz do projeto web para acesso a API com o seguinte:

```sh
VITE_API_URL = http://localhost:3000
```