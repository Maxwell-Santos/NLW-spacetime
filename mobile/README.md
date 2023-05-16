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
```


- Prettier com tailwindcss
<code>npm i prettier-plugin-tailwindcss -D</code>

E por fim recarregar a window
