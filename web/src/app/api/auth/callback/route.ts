import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  // esse token foi criado para caso o usuário queira acessar uma url específica mas ela é privada para quem tem login, o código foi feito no 'api/auth/logout/route.tsx'
  const redirectTo = request.cookies.get('redirectTo')?.value

  const registerResponde = await api.post('/register', {
    code,
  })

  const { token } = registerResponde.data

  /** ?? se o primeiro parâmetro for verdade, vai executar ele, senão, vai para o segundo */
  // redirecionar o usuário para a raiz da aplicação
  const redirectURL = redirectTo ?? new URL('/', request.url)

  // segundos, minutos, horas, dias
  const cookieExpiresInSeconds = 60 * 60 * 24 * 30
  // redireciona o usuário, cria um novo token que vai ficar disponível em toda a aplicação
  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds};`,
    },
  })
}
