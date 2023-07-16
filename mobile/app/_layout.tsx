import React, { useEffect, useState } from 'react'
import { SplashScreen, Stack } from 'expo-router'
import { styled } from 'nativewind'
import blurBg from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import { StatusBar } from 'expo-status-bar'
import { ImageBackground } from 'react-native'
import * as SecureStore from 'expo-secure-store'

// o nativewind só consegue usar o tailwind nos componentes globais do react-native, mas esse Stripes é um componente criado a partir de um svg, pela lib react-native-svg-transformer
// daí para mostrar que esse componente também pode ser estilizado com o tailwind, precisa declarar esse styles do próprio nativewind
// agora essa variável é o componente que poderá ser estilizado com tailwind
const StyledStripes = styled(Stripes)

export default function Layout() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<
    null | boolean
  >(null)

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) => {
      // converte o token para um boolean, se o token existir, '!!' vai converter ele para true
      setIsUserAuthenticated(!!token) // true or false
    })
  }, [])
  if (!hasLoadedFonts) {
    return <SplashScreen />
  }

  return (
    <ImageBackground
      source={blurBg}
      className="relative flex-1 bg-gray-900"
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StyledStripes className="absolute left-2" />
      <StatusBar style="auto" />

      {/* é onde vai vai ficar as telas, elas vão fazer uma navegação com animação em pilha na troca das telas */}
      <Stack
        screenOptions={{
          headerShown: false, // por padrão esse componente vem com header
          contentStyle: { backgroundColor: 'transparent' },
        }}
      >
        {/* Stack.Screen avisa para o app quais rotas vão ter na minha aplicação */}
        {/* redirect, vai redirecionar para a próxima rota caso esse valor seja verdade, e a próxima é a memories */}
        <Stack.Screen name="index" redirect={isUserAuthenticated} />
        <Stack.Screen name="new" />
        <Stack.Screen name="memories" />
      </Stack>
    </ImageBackground>
  )
}
