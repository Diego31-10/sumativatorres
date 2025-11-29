import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { ListTodo, Plus } from 'lucide-react-native';
import Button from '../components/ui/Button';
import { useTheme } from '../hooks/useTheme';

export default function Index() {
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.background, paddingHorizontal: 24 }}>
      <ListTodo size={80} color={theme.colors.primary} strokeWidth={1.5} />
      
      <Text style={{ fontSize: 32, fontWeight: 'bold', color: theme.colors.primary, marginTop: 16, marginBottom: 8 }}>
        TaskFlow AI
      </Text>
      <Text style={{ fontSize: 16, color: theme.colors.textSecondary, marginBottom: 48, textAlign: 'center' }}>
        Gestión inteligente de tareas
      </Text>
      
      <View style={{ width: '100%', gap: 12 }}>
        <Button
          title="Ver Mis Tareas"
          onPress={() => router.push('/tasks')}
        />
        
        <Button
          title="Crear Nueva Tarea"
          onPress={() => router.push('/tasks/new')}
          variant="secondary"
        />
      </View>
    </View>
  );
}