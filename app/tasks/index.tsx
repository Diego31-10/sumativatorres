import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { useTasks } from '../../hooks/useTasks';
import TaskCard from '../../components/TaskCard';
import Button from '../../components/ui/Button';

export default function TasksList() {
  const { tasks, loading, error, fetchTasks, toggleTask } = useTasks();
  const [refreshing, setRefreshing] = useState(false);

  // Cargar tareas al montar el componente
  useEffect(() => {
    fetchTasks();
  }, []);

  // Función para refrescar
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTasks();
    setRefreshing(false);
  };

  // Manejar toggle de tarea
  const handleToggle = async (id: string) => {
    try {
      await toggleTask(id);
    } catch (error) {
      console.error('Error al cambiar estado:', error);
    }
  };

  // Estado de carga inicial
  if (loading === 'loading' && tasks.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="text-gray-600 mt-4">Cargando tareas...</Text>
      </View>
    );
  }

  // Estado de error
  if (loading === 'error' && tasks.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 px-6">
        <Text className="text-6xl mb-4">⚠️</Text>
        <Text className="text-xl font-bold text-gray-800 mb-2">Error al cargar</Text>
        <Text className="text-gray-600 text-center mb-6">{error}</Text>
        <Button title="Reintentar" onPress={fetchTasks} />
      </View>
    );
  }

  // Estado vacío
  if (tasks.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 px-6">
        <Text className="text-6xl mb-4">📝</Text>
        <Text className="text-xl font-bold text-gray-800 mb-2">No hay tareas</Text>
        <Text className="text-gray-600 text-center mb-6">
          Comienza creando tu primera tarea
        </Text>
        <Button
          title="Crear Primera Tarea"
          onPress={() => router.push('/tasks/new')}
        />
      </View>
    );
  }

  // Lista de tareas
  return (
    <View className="flex-1 bg-gray-50">
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard task={item} onToggle={handleToggle} />
        )}
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#3b82f6']}
          />
        }
      />

      {/* Botón flotante para agregar tarea */}
      <TouchableOpacity
        onPress={() => router.push('/tasks/new')}
        className="absolute bottom-6 right-6 bg-blue-600 w-14 h-14 rounded-full items-center justify-center shadow-lg"
        activeOpacity={0.8}
      >
        <Text className="text-white text-3xl font-light">+</Text>
      </TouchableOpacity>
    </View>
  );
}