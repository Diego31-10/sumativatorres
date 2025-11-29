import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { CheckCircle, Clock, Calendar, Sparkles, AlertCircle } from 'lucide-react-native';
import { useTasks } from '../../hooks/useTasks';
import { useTheme } from '../../hooks/useTheme';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import AISuggestionModal from '../../components/AISuggestionModal';
import { TaskFormData, ValidationErrors, AISuggestion } from '../../types';
import { validateTaskForm } from '../../lib/validation';
import { suggestTaskImprovements, isAIConfigured } from '../../lib/ai';

export default function TaskDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getTask, updateTask, removeTask, loading } = useTasks();
  const { theme } = useTheme();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [aiLoading, setAiLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<AISuggestion | null>(null);

  const task = getTask(id as string);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
      });
    }
  }, [task]);

  const showAlert = (title: string, message: string, onOk?: () => void) => {
    if (Platform.OS === 'web') {
      alert(`${title}\n\n${message}`);
      if (onOk) onOk();
    } else {
      const { Alert } = require('react-native');
      Alert.alert(title, message, [
        {
          text: 'OK',
          onPress: onOk
        }
      ]);
    }
  };

  const showConfirm = (title: string, message: string, onConfirm: () => void) => {
    if (Platform.OS === 'web') {
      if (window.confirm(`${title}\n\n${message}`)) {
        onConfirm();
      }
    } else {
      const { Alert } = require('react-native');
      Alert.alert(title, message, [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: onConfirm }
      ]);
    }
  };

  const handleAISuggest = async () => {
    if (!formData.title.trim() || formData.title.trim().length < 3) {
      showAlert(
        'Información insuficiente',
        'Por favor escribe al menos un título de 3 caracteres para que la IA pueda ayudarte.'
      );
      return;
    }

    if (!isAIConfigured()) {
      showAlert(
        'IA no configurada',
        'La API Key de Gemini no está configurada.'
      );
      return;
    }

    setAiLoading(true);

    try {
      const suggestion = await suggestTaskImprovements(
        formData.title,
        formData.description || 'Sin descripción'
      );
      
      setAiSuggestion(suggestion);
      setShowSuggestions(true);
    } catch (error) {
      showAlert(
        'Error de IA',
        error instanceof Error ? error.message : 'No se pudieron generar sugerencias'
      );
    } finally {
      setAiLoading(false);
    }
  };

  const handleApplySuggestion = (suggestion: AISuggestion) => {
    setFormData({
      title: suggestion.improvedTitle,
      description: suggestion.improvedDescription,
    });
    setErrors({});
    setShowSuggestions(false);
    showAlert(
      'Sugerencias aplicadas',
      'La IA ha mejorado tu tarea.'
    );
  };

  const handleUpdate = async () => {
    const validationErrors = validateTaskForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    
    try {
      await updateTask(id as string, formData);
      
      showAlert(
        'Tarea actualizada',
        'Los cambios se guardaron correctamente.',
        () => {
          setIsEditing(false);
        }
      );
    } catch (error) {
      showAlert(
        'Error',
        error instanceof Error ? error.message : 'No se pudo actualizar la tarea'
      );
    }
  };

  const handleDelete = () => {
    showConfirm(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar esta tarea? Esta acción no se puede deshacer.',
      async () => {
        try {
          await removeTask(id as string);
          
          showAlert(
            'Tarea eliminada',
            'La tarea se eliminó correctamente.',
            () => {
              router.push('/tasks');
            }
          );
        } catch (error) {
          showAlert(
            'Error',
            error instanceof Error ? error.message : 'No se pudo eliminar la tarea'
          );
        }
      }
    );
  };

  // Si no existe la tarea
  if (!task) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.background, paddingHorizontal: 24 }}>
        <AlertCircle size={64} color={theme.colors.error} strokeWidth={1.5} />
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.colors.text, marginTop: 16, marginBottom: 8 }}>
          Tarea no encontrada
        </Text>
        <Text style={{ color: theme.colors.textSecondary, textAlign: 'center', marginBottom: 24 }}>
          La tarea que buscas no existe o fue eliminada.
        </Text>
        <Button
          title="Volver a la lista"
          onPress={() => router.push('/tasks')}
        />
      </View>
    );
  }

  // Modo solo lectura
  if (!isEditing) {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <View style={{ padding: 24 }}>
          {/* Estado de completado */}
          <View style={{ 
            backgroundColor: task.completed ? theme.colors.success + '20' : theme.colors.info + '20',
            borderRadius: 12, 
            padding: 16, 
            marginBottom: 24,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: task.completed ? theme.colors.success + '40' : theme.colors.info + '40'
          }}>
            {task.completed ? (
              <CheckCircle size={20} color={theme.colors.success} strokeWidth={2} />
            ) : (
              <Clock size={20} color={theme.colors.info} strokeWidth={2} />
            )}
            <Text style={{ 
              color: task.completed ? theme.colors.success : theme.colors.info,
              fontWeight: '600',
              marginLeft: 8,
              fontSize: 16
            }}>
              {task.completed ? 'Completada' : 'Pendiente'}
            </Text>
          </View>

          {/* Título */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 12, fontWeight: '600', marginBottom: 8, letterSpacing: 1 }}>
              TÍTULO
            </Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.colors.text }}>
              {task.title}
            </Text>
          </View>

          {/* Descripción */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 12, fontWeight: '600', marginBottom: 8, letterSpacing: 1 }}>
              DESCRIPCIÓN
            </Text>
            <Text style={{ fontSize: 16, color: theme.colors.text, lineHeight: 24 }}>
              {task.description}
            </Text>
          </View>

          {/* Fecha de creación */}
          <View style={{ marginBottom: 32 }}>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 12, fontWeight: '600', marginBottom: 8, letterSpacing: 1 }}>
              FECHA DE CREACIÓN
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Calendar size={16} color={theme.colors.textSecondary} strokeWidth={2} />
              <Text style={{ fontSize: 16, color: theme.colors.text, marginLeft: 8 }}>
                {new Date(task.createdAt).toLocaleDateString('es-ES', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
            </View>
          </View>

          {/* Botones de acción */}
          <View style={{ gap: 12 }}>
            <Button
              title="Editar Tarea"
              onPress={() => setIsEditing(true)}
            />
            
            <Button
              title="Eliminar Tarea"
              onPress={handleDelete}
              variant="danger"
              disabled={loading === 'loading'}
            />

            <Button
              title="Volver a la lista"
              onPress={() => router.push('/tasks')}
              variant="secondary"
            />
          </View>
        </View>
      </ScrollView>
    );
  }

  // Modo edición
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <View style={{ padding: 24 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.colors.text, marginBottom: 24 }}>
            Editar Tarea
          </Text>

          <Input
            label="Título"
            placeholder="Ej: Comprar víveres"
            value={formData.title}
            onChangeText={(text) => {
              setFormData({ ...formData, title: text });
              if (errors.title) {
                setErrors({ ...errors, title: undefined });
              }
            }}
            error={errors.title}
            editable={loading !== 'loading' && !aiLoading}
          />

          <Input
            label="Descripción"
            placeholder="Ej: Comprar leche pan y huevos en el supermercado"
            value={formData.description}
            onChangeText={(text) => {
              setFormData({ ...formData, description: text });
              if (errors.description) {
                setErrors({ ...errors, description: undefined });
              }
            }}
            error={errors.description}
            multiline
            editable={loading !== 'loading' && !aiLoading}
          />

          {/* Botón de IA */}
          <View style={{ 
            marginBottom: 16, 
            backgroundColor: theme.colors.info + '10',
            borderRadius: 12, 
            padding: 16,
            borderWidth: 1,
            borderColor: theme.colors.info + '30'
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Sparkles size={20} color={theme.colors.info} strokeWidth={2} />
              <Text style={{ color: theme.colors.text, fontSize: 14, marginLeft: 8 }}>
                ¿Necesitas ayuda? La IA puede mejorar tu tarea
              </Text>
            </View>
            <Button
              title={aiLoading ? "Consultando IA..." : "Sugerir con IA"}
              onPress={handleAISuggest}
              loading={aiLoading}
              disabled={loading === 'loading'}
            />
          </View>

          <View style={{ marginTop: 16 }}>
            <Button
              title="Guardar Cambios"
              onPress={handleUpdate}
              loading={loading === 'loading'}
              disabled={aiLoading}
            />
          </View>

          <View style={{ marginTop: 12 }}>
            <Button
              title="Cancelar"
              onPress={() => {
                setIsEditing(false);
                if (task) {
                  setFormData({
                    title: task.title,
                    description: task.description,
                  });
                  setErrors({});
                }
              }}
              variant="secondary"
              disabled={loading === 'loading' || aiLoading}
            />
          </View>
        </View>
      </ScrollView>

      <AISuggestionModal
        visible={showSuggestions}
        suggestion={aiSuggestion}
        onApply={handleApplySuggestion}
        onClose={() => setShowSuggestions(false)}
      />
    </KeyboardAvoidingView>
  );
}