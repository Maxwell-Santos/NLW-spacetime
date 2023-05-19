import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  const registerResponde = await api.post('/register', {
    code,
  })

  const { token } = registerResponde.data

  // redirecionar o usuário para a raiz da aplicação
  const redirectURL = new URL('/', request.url)

  // segundos, minutos, horas, dias
  const cookieExpiresInSeconds = 60 * 60 * 24 * 30
  // redireciona o usuário, cria um novo token que vai ficar disponível em toda a aplicação
  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds};`,
    },
  })
}
