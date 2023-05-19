import { useEffect } from 'react'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import { StatusBar } from 'expo-status-bar'

import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import { styled } from 'nativewind'
import blurBg from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg'
import NLWLogo from '../src/assets/nlw-spacetime-svg-logo.svg'
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session'
import { api } from '../src/lib/api'
import * as SecureStore from 'expo-secure-store'
import { useRouter } from 'expo-router'

// o nativewind só consegue usar o tailwind nos componentes globais do react-native, mas esse Stripes é um componente criado a partir de um svg, pela lib react-native-svg-transformer
// daí para mostrar que esse componente também pode ser estilizado com o tailwind, precisa declarar esse styles do próprio nativewind
// agora essa variável é o componente que poderá ser estilizado com tailwind
const StyledStripes = styled(Stripes)

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/1b7151c826cd26d2d62a',
}

export default function App() {
  const router = useRouter()

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  const [, response, signInWithGithub] = useAuthRequest(
    {
      clientId: '1b7151c826cd26d2d62a',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetime',
      }),
    },
    discovery,
  )

  async function handleGithubOAuthCode(code: string) {
    const response = await api.post('/register', {
      code,
    })

    const { token } = response.data

    await SecureStore.setItemAsync('token', token)

    router.push('/memories')
  }

  useEffect(() => {
    // url para usar para obter a autenticação
    // console.log(
    //   makeRedirectUri({
    //     scheme: 'nlwspacetime',
    //   }),
    // )

    if (response?.type === 'success') {
      const { code } = response.params

      console.log('CÓDIGO', code)

      handleGithubOAuthCode(code)
    }
  }, [response])

  if (!hasLoadedFonts) return null

  return (
    <ImageBackground
      source={blurBg}
      className="relative flex-1 items-center bg-gray-900 px-8 py-10"
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StyledStripes className="absolute left-2" />

      <View className="flex-1 items-center justify-center gap-6">
        <NLWLogo />
        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="reading-relaxed text-center font-body text-base text-gray-200">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7} // diminuir um pouco a opacidade quando clicar
          className="rounded-full bg-green-500 px-5 py-2"
          onPress={() => signInWithGithub()}
        >
          <Text className="font-alt text-sm uppercase text-black">
            Cadastrar lembranças
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="text-center font-body text-sm text-gray-200 ">
        Feito com 💜 no NLW da Rocketseat
      </Text>
      <StatusBar style="auto" />
    </ImageBackground>
  )
}
