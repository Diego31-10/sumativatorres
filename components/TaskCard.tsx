import { View, Text, TouchableOpacity } from 'react-native';
import { CheckCircle2, Circle, ChevronRight } from 'lucide-react-native';
import { Task } from '../types';
import { router } from 'expo-router';
import { useTheme } from '../hooks/useTheme';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
}

export default function TaskCard({ task, onToggle }: TaskCardProps) {
  const { theme } = useTheme();

  const handlePress = () => {
    router.push(`/tasks/${task.id}`);
  };

  const handleToggle = (e: any) => {
    e.stopPropagation();
    onToggle(task.id);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: theme.colors.border,
      }}
      activeOpacity={0.7}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        {/* Checkbox con icono */}
        <TouchableOpacity onPress={handleToggle} style={{ marginRight: 12 }}>
          {task.completed ? (
            <CheckCircle2 size={24} color={theme.colors.success} strokeWidth={2} />
          ) : (
            <Circle size={24} color={theme.colors.textSecondary} strokeWidth={2} />
          )}
        </TouchableOpacity>

        {/* Contenido */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: task.completed ? theme.colors.textSecondary : theme.colors.text,
              textDecorationLine: task.completed ? 'line-through' : 'none',
            }}
          >
            {task.title}
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginTop: 4,
              color: theme.colors.textSecondary,
            }}
            numberOfLines={2}
          >
            {task.description}
          </Text>
          <Text style={{ fontSize: 12, color: theme.colors.textSecondary, marginTop: 8 }}>
            {new Date(task.createdAt).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </Text>
        </View>

        {/* Indicador visual */}
        <View style={{ marginLeft: 8 }}>
          <ChevronRight size={20} color={theme.colors.textSecondary} />
        </View>
      </View>
    </TouchableOpacity>
  );
}