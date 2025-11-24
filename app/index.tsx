import { View, Text } from 'react-native';
import { router } from 'expo-router';
import Button from '../components/ui/Button';
import "@/global.css"

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-50 px-6">
      <Text className="text-3xl font-bold text-blue-600 mb-2">
        TaskFlow AI
      </Text>
      <Text className="text-gray-500 mb-8 text-center">
        Gestión inteligente de tareas
      </Text>
      
      <View className="w-full">
        <Button
          title="Crear Nueva Tarea"
          onPress={() => router.push('/tasks/new')}
        />
      </View>
    </View>
  );
}