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

## Criando os tripes com css puro
adicionar esse código no tailwind.config.js para que vai fazer o efeito de tipo um gradient que numa conta básica, se eu tiver uma div com um fundo de 8px de largura, ele vai aplicar esse branco, a cada 8px então ali no backgroundSize eu coloquei isso, a div vai ter 100% de altura de 8px de largura, isso da um efeito tipo de varinhas linhas, igual  uma régua
```js
backgroundImage: {
  stripes:
    'linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.1) 12.5%, transparent 12.5%, transparent)',
},
backgroundSize: {
  stripes: '100% 8px',
}
```