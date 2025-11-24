import { View, Text } from 'react-native';
import "@/global.css"

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-50">
      <Text className="text-3xl font-bold text-blue-600">
        TaskFlow AI
      </Text>
      <Text className="text-gray-500 mt-2">
        Gestión inteligente de tareas
      </Text>
    </View>
  );
}