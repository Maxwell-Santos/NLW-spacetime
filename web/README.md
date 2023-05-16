## Parte WEB da Aplicação

instalando o eslint com prettier para melhorar a estilização com tailwindcss

<code>npm i @rocketseat/eslint-config -D</code>

Adicionar mais um estilo no arquivo .eslintrc.json, que agora vai ficar assim 

```json
{
  "extends": ["next/core-web-vitals", "@rocketseat/eslint-config/react"]
}
```

Baixar o prettier <code>npm i prettier-plugin-tailwindcss -D</code>
Esse plugin serve para ordenar as classes numa ordem semântica
Criar um arquivo na raiz no projeto: prettier.config.js com o conteúdo:

```js
module.exports = {
  plugins: [require('prettier-plugin-tailwindcss')],
}
```

O prettier ja vem instalado com o pluging da rocketseat, então basta instalar esse outro e já era