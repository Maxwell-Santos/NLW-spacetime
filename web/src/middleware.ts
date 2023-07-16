import { NextRequest, NextResponse } from 'next/server'

const signInURL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  // redireciona para o login
  if (!token) {
    // quando o usuário acessar alguma página restrita sem autenticação, ele vai direcionar para o login no github e após isso vai voltar a página que estava tentando ser acessado, ao invés de voltar ao início do site
    // isso é feito salvando em cookie a url original

    // HttpOnly: faz com que o cookie fique disponível apenas para o backend da aplicação
    return NextResponse.redirect(signInURL, {
      headers: {
        'Set-Cookie': `redirectTo=${request.url}; Path=/; HttpOnly; max-age=20;`,
      },
    })
  }

  // não faz nada
  return NextResponse.next()
}

// qualquer rota que vem depois de memories, ele vai fazer a função de verificação
export const config = {
  matcher: '/memories/:path*',
}
