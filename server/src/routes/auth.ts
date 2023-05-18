import { prisma } from './../lib/prisma'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import axios from 'axios'

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', async (request) => {
    const bodySchema = z.object({
      code: z.string(),
    })

    const { code } = bodySchema.parse(request.body)

    const accessTokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      null, // corpo da requisição
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      },
    )

    const { access_token } = accessTokenResponse.data

    // fazendo o login como se fosse o usuário para obter os dados dele
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    // dados que eu vou querer para fazer o login na minha aplicação
    const userSchema = z.object({
      id: z.number(),
      login: z.string(),
      name: z.string(),
      avatar_url: z.string().url(),
    })
    const userInfo = userSchema.parse(userResponse.data)

    // checar se o usuário ja existe
    // para usar o *userSchema*, os atributos de where tem que ter o unique la no model de user, nesse caso o githubId é unique
    let user = await prisma.user.findUnique({
      where: {
        githubId: userInfo.id,
      },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          githubId: userInfo.id,
          login: userInfo.login,
          name: userInfo.name,
          avatarUrl: userInfo.avatar_url,
        },
      })
    }

    const token = app.jwt.sign(
      {
        // dados públicos
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      {
        // informação unica
        sub: user.id,
        expiresIn: '30 days',
      },
    )

    return { token }
  })
}
