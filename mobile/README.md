## Adicionando Tailwind no projeto React-Native

1. Instalar as dependências
Essa biblioteca é da comunidade que faz com que seja possível usar tailwind no mobile
<code>npm i nativewind</code>
<code>npm i tailwindcss -D</code>

2. Iniciar o Tailwind
<code>npx tailwindcss init</code>
Mudar o atributo content por esse: <code>content: ["./App.tsx", "./app/**/*.tsx"]</code>

3. Mudar o Babel config
<code>plugins: ["nativewind/babel"]</code>

4. Adicionar os Types do NativeWind no tsconfig.json

```json
"compilerOptions": {
  "types": [
    "nativewind/types"
  ]
}
```

** Caso o estilo não esteja funcionando, lembrar que todos os elementos são display flex, logo para a view que engloba tudo, adicionar um className="flex-1", para pegar a tela toda


### Instalando o Eslint

- ESLint
<code>npm i eslint @rocketseat/eslint-config -D</code>

Criar arquivo prettier.config.js com o conteúdo: 
```js
module.exports = {
  plugins: [require('prettier-plugin-tailwindcss')],
}
```

- Prettier com tailwindcss
<code>npm i prettier-plugin-tailwindcss -D</code>

E por fim recarregar a window

### criando regras no eslint

para criar uma regra no eslint 
nesse caso ele vai ignorar a regra de sempre declarar variáveis em camelcase, nesse caso tem variáveis que vem com o nome assim: 
Roboto_Bold700 
Esse underline, antes da regra, era um erro de lint
```json
//.eslintrc.json

  "rules": {
    "camelcase": "off"
  }
```
### ImageBackground
é um componente do react, tipo uma view mesmo, mas ela aceita uma image de fundo

### Usando SVG no React-native
para usar svg, precisa instalar uma biblioteca que permite com que importe arquivos .svg

Instalar bibliotecas:
1. npx expo install react-native-svg
2. npm i -D install react-native-svg-transformer
3. Criar um arquivo na raiz <code>metro.config.js</code> e colocar o código 

```js
const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"],
  };

  return config;
})();
```

4. e no arquivo assets.d.ts, para entender que o .svg é um arquivo que pode ser importado

```ts
declare module "*.svg" {
  import React from 'react';
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
```

## OAuth
OAuth é uma forma de fazer login numa aplicação com dados de login de outra aplicação. Nesse caso vou usar o Github como sistema de login, para a minha aplicação.

A ideia é abrir uma janela do navegador na aplicação, sem sair dela, para fazer o login e fechar a guia.

### bibliotecas
Se pesquisa expo Auth session, vai cair na lib
[Oauth]('https://docs.expo.dev/versions/latest/sdk/auth-session/')

- npx expo install expo-auth-session expo-crypto

```json
//app.json
"expo":{
  // código
  "scheme": "nlwspacetime"
  // código
}
```

- clicar no link authentication guide, e ir até github
  - criar novo app no github
  - copiar o código de exemplo da documentação
  - e na parte do **callback URL** la na criação do app no github mesmo, vai colocar o link que aparecer no console.log desse código
  ```js
  useEffect(() => {
      console.log(
      makeRedirectUri({
        scheme: 'nlwspacetime', //mesmo nome que definiu la no app.json
      })
    )
    /*Resto do código*/
  })
  ```
  - Authorization callback URL, colocar o link que mostrar do console.log de cima
  - Após gerar o token, vai precisar fazer um post para o backend, na rota register, para registrar esse novo usuário (tudo dentro do useEffect)
    - Instalar a biblioteca SecureStore <code>npx expo install expo-secure-store</code> para armazenar o token no celular
  - A resposta do post, também vai gerar um token que vai ser armazenado na memória do celular, o código fica mais ou menos assim:
  ```tsx
   api
        .post('/register', {
          code,
        })
        .then((res) => {
          const { token } = res.data

          SecureStore.setItemAsync('token', token)
        })
        .catch((err) => console.error(err))
  ```
* Nas variáveis ambiente do servidor, vai precisar colocar os dados também do outro app que foi criado no github, para mostrar que vai vir do android, isso é só para o desenvolvimento

## Redirecionando o usuário logado
A biblioteca que vai usar é a expo-router ai na opção getting started, vai abrir a documentação da lib
<code>npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar</code>