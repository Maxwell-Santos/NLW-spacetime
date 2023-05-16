import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-950 p-3">
      <Text className="text-3xl font-bold text-zinc-50">
        Estamos começando agora mesmo
      </Text>
      <StatusBar style="auto" />
    </View>
  )
}
