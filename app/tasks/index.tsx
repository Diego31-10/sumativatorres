import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { Plus, AlertCircle, ClipboardList } from 'lucide-react-native';
import { useTasks } from '../../hooks/useTasks';
import { useTheme } from '../../hooks/useTheme';
import TaskCard from '../../components/TaskCard';
import Button from '../../components/ui/Button';

export default function TasksList() {
  const { tasks, loading, error, fetchTasks, toggleTask } = useTasks();
  const { theme } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTasks();
    setRefreshing(false);
  };

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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.background }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={{ color: theme.colors.textSecondary, marginTop: 16 }}>Cargando tareas...</Text>
      </View>
    );
  }

  // Estado de error
  if (loading === 'error' && tasks.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.background, paddingHorizontal: 24 }}>
        <AlertCircle size={64} color={theme.colors.error} strokeWidth={1.5} />
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.colors.text, marginTop: 16, marginBottom: 8 }}>
          Error al cargar
        </Text>
        <Text style={{ color: theme.colors.textSecondary, textAlign: 'center', marginBottom: 24 }}>
          {error}
        </Text>
        <Button title="Reintentar" onPress={fetchTasks} />
      </View>
    );
  }

  // Estado vacío
  if (tasks.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.background, paddingHorizontal: 24 }}>
        <ClipboardList size={64} color={theme.colors.textSecondary} strokeWidth={1.5} />
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.colors.text, marginTop: 16, marginBottom: 8 }}>
          No hay tareas
        </Text>
        <Text style={{ color: theme.colors.textSecondary, textAlign: 'center', marginBottom: 24 }}>
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
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
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
            colors={[theme.colors.primary]}
          />
        }
      />

      {/* Botón flotante para agregar tarea */}
      <TouchableOpacity
        onPress={() => router.push('/tasks/new')}
        style={{
          position: 'absolute',
          bottom: 24,
          right: 24,
          backgroundColor: theme.colors.primary,
          width: 56,
          height: 56,
          borderRadius: 28,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
        activeOpacity={0.8}
      >
        <Plus size={28} color="#fff" strokeWidth={2.5} />
      </TouchableOpacity>
    </View>
  );
}