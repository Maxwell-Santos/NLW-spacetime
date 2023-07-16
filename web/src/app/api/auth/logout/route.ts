import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // redirecionar o usuário para a raiz da aplicação
  const redirectURL = new URL('/', request.url)

  // redireciona o usuário, cria um novo token que vai ficar disponível em toda a aplicação
  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=; Path=/; max-age=0;`,
    },
  })
}
