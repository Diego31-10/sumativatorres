import { View, Text, TouchableOpacity } from 'react-native';
import { Task } from '../types';
import { router } from 'expo-router';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
}

export default function TaskCard({ task, onToggle }: TaskCardProps) {
  const handlePress = () => {
    router.push(`/tasks/${task.id}`);
  };

  const handleToggle = (e: any) => {
    // Prevenir navegación al presionar el checkbox
    e.stopPropagation();
    onToggle(task.id);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="bg-white rounded-lg p-4 mb-3 shadow-sm border border-gray-200"
      activeOpacity={0.7}
    >
      <View className="flex-row items-start">
        {/* Checkbox */}
        <TouchableOpacity
          onPress={handleToggle}
          className={`w-6 h-6 rounded border-2 mr-3 items-center justify-center ${
            task.completed ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
          }`}
        >
          {task.completed && (
            <Text className="text-white text-xs font-bold">✓</Text>
          )}
        </TouchableOpacity>

        {/* Contenido */}
        <View className="flex-1">
          <Text
            className={`text-lg font-semibold ${
              task.completed ? 'text-gray-400 line-through' : 'text-gray-800'
            }`}
          >
            {task.title}
          </Text>
          <Text
            className={`text-sm mt-1 ${
              task.completed ? 'text-gray-300' : 'text-gray-600'
            }`}
            numberOfLines={2}
          >
            {task.description}
          </Text>
          <Text className="text-xs text-gray-400 mt-2">
            {new Date(task.createdAt).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </Text>
        </View>

        {/* Indicador visual */}
        <View className="ml-2">
          <Text className="text-gray-400 text-xl">›</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}