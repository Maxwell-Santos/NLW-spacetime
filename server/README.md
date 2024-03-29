## Ordem de instalação de das dependências

<code>npm init -y</code>
<br />
<code>npm i typescript -D</code>
<br />
<code>npm i @types/node -D</code>

o npx é uma forma de executar binários instalados pela biblioteca de desenvolvimento

- vai iniciar o tsconfig as configurações do typescrit no projeto
<code>npx tsc --init </code>

  - Mudar o target para es2020

- serve para executar a transpilação automático do ts para js
<code>npm i tsx -D</code>

- vai executar nesse arquivo o ts, ja que o node não entende
<code>npx tsx src/server.ts</code>

E depois disso é só adicionar esse comando no package.json

```js
  "scripts":{
    "dev": "tsx watch src/server.ts"
  }
```

Logo, sempre que executar npm run dev, ele vai fazer esse comando do tsx

- O próximo framework é o <code>npm i fastify</code>

ES LINT <code>npm i eslint -D</code> para padronizar o código, nesse caso ja estou usando uma configuração da própria rocketseat, mas caso quisesse criar uma própria é só executar <code>npx eslint --init</code>

- Para configurar todos os arquivos com o eslint, de uma vez, é só criar esse script no package.json <code>"lint": "eslint src --ext .ts --fix"</code>


### Prisma

Prisma é uma ferramenta que faz a intercipitação do backend com o banco de dados, e ele suporta diversos bancos, nesse caso vai ser o SQLite

<code>npm i prisma -D</code>
<code>npx prisma init --datasource-provider SQLite</code> Falando para o prisma o banco de dados que vou usar, nesse caso o SQLite

O prisma vai criar uma pasta e um arquivo chamado schema.prisma, e é nesse arquivo que vão ficar as tabelas do banco de dados

Esse código vai levar o arquivo schema.prisma e vai detectar todas as mudanças desde a ultima vez que executei esse arquivo
<code>npx prisma migrate dev</code>
"Cada migration representa tipo um commit"

Vai abrir no navegador uma interface integrada do prisma que mostra o banco de dados em tempo real
<code>npx prisma studio</code>


#### Acessar o banco de dados de dentro do servidor
<code>npm i @prisma/client</code>
Após isso, no arquivo server.ts onde inicia o servidor, basta criar uma instância do PrismaClient, e um exemplo de requisição dos usuários

```ts
import { PrismaClient } from '@prisma/client'

const app = fastify()
const prisma = new PrismaClient()

// localhost:3333/users
app.get('/users', async () => {
  const users = await prisma.user.findMany() //pegar vários usuários
  return users
})
```

## Usando o cors
O cors serve para determinar quais url de frontend podem acessar a API

<code>npm i @fastfy/cors</code>

## Usar variável ambiente
Para usar variáveis ambiente no backend, precisa usar uma biblioteca <code>npm i dotenv -D</code>

## Axios
O axios serve para fazer requisições http dentro do código, uma alternativa ao próprio fetch do js <code>npm i axios</code>

## Usando JWT
Nesse caso como ja está usando o fastify, ele mesmo tem a sua biblioteca de jwt <code>npm i @fastify/jwt</code>

## Upload de arquivos
Instalar o <code>npm i @fastify/multipart</code>

Esse tipo de envio "multipart" é o mesmo tipo de envio de um formulário no html, quando você coloca uma rota, no action do forumlário, os dados são enviador com o tipo multipart, e não json

*O json só aceita envio por texto