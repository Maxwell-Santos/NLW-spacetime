import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

import { StatusBar } from 'expo-status-bar'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import blurBg from './src/assets/bg-blur.png'
import Stripes from './src/assets/stripes.svg'
import NLWLogo from './src/assets/nlw-spacetime-svg-logo.svg'
import { styled } from 'nativewind'

// o nativewind só consegue usar o tailwind nos componentes globais do react-native, mas esse Stripes é um componente criado a partir de um svg, pela lib react-native-svg-transformer
// daí para mostrar que esse componente também pode ser estilizado com o tailwind, precisa declarar esse styles do próprio nativewind
// agora essa variável é o componente que poderá ser estilizado com tailwind
const StyledStripes = styled(Stripes)

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

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
          <Text className="reading-relazed text-center font-body text-base text-gray-200">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7} // diminuir um pouco a opacidade quando clicar
          className="rounded-full bg-green-500 px-5 py-2"
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
