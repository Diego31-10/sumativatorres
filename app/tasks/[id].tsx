import { View, Text, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useTasks } from '../../hooks/useTasks';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { TaskFormData, ValidationErrors } from '../../types';
import { validateTaskForm } from '../../lib/validation';

export default function TaskDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getTask, updateTask, removeTask, loading } = useTasks();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  const task = getTask(id as string);

  // Cargar datos de la tarea
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

  const handleUpdate = async () => {
    // Validar formulario
    const validationErrors = validateTaskForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    
    try {
      await updateTask(id as string, formData);
      
      showAlert(
        '✅ Tarea actualizada',
        'Los cambios se guardaron correctamente.',
        () => {
          setIsEditing(false);
        }
      );
    } catch (error) {
      showAlert(
        '❌ Error',
        error instanceof Error ? error.message : 'No se pudo actualizar la tarea'
      );
    }
  };

  const handleDelete = () => {
    showConfirm(
      '⚠️ Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar esta tarea? Esta acción no se puede deshacer.',
      async () => {
        try {
          await removeTask(id as string);
          
          showAlert(
            '✅ Tarea eliminada',
            'La tarea se eliminó correctamente.',
            () => {
              router.push('/tasks');
            }
          );
        } catch (error) {
          showAlert(
            '❌ Error',
            error instanceof Error ? error.message : 'No se pudo eliminar la tarea'
          );
        }
      }
    );
  };

  // Si no existe la tarea
  if (!task) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 px-6">
        <Text className="text-6xl mb-4">❌</Text>
        <Text className="text-xl font-bold text-gray-800 mb-2">Tarea no encontrada</Text>
        <Text className="text-gray-600 text-center mb-6">
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
      <ScrollView className="flex-1 bg-gray-50">
        <View className="p-6">
          {/* Estado de completado */}
          <View className={`rounded-lg p-4 mb-6 ${task.completed ? 'bg-green-100' : 'bg-blue-100'}`}>
            <Text className={`text-center font-semibold ${task.completed ? 'text-green-800' : 'text-blue-800'}`}>
              {task.completed ? '✓ Completada' : '⏳ Pendiente'}
            </Text>
          </View>

          {/* Título */}
          <View className="mb-6">
            <Text className="text-gray-500 text-sm font-semibold mb-2">TÍTULO</Text>
            <Text className="text-2xl font-bold text-gray-800">{task.title}</Text>
          </View>

          {/* Descripción */}
          <View className="mb-6">
            <Text className="text-gray-500 text-sm font-semibold mb-2">DESCRIPCIÓN</Text>
            <Text className="text-base text-gray-700 leading-6">{task.description}</Text>
          </View>

          {/* Fecha de creación */}
          <View className="mb-8">
            <Text className="text-gray-500 text-sm font-semibold mb-2">FECHA DE CREACIÓN</Text>
            <Text className="text-base text-gray-700">
              {new Date(task.createdAt).toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>

          {/* Botones de acción */}
          <View className="space-y-3">
            <Button
              title="Editar Tarea"
              onPress={() => setIsEditing(true)}
            />
            
            <View className="mt-3">
              <Button
                title="Eliminar Tarea"
                onPress={handleDelete}
                variant="danger"
                disabled={loading === 'loading'}
              />
            </View>

            <View className="mt-3">
              <Button
                title="Volver a la lista"
                onPress={() => router.push('/tasks')}
                variant="secondary"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  // Modo edición
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView className="flex-1 bg-gray-50">
        <View className="p-6">
          <Text className="text-2xl font-bold text-gray-800 mb-6">
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
            editable={loading !== 'loading'}
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
            editable={loading !== 'loading'}
          />

          <View className="mt-4">
            <Button
              title="Guardar Cambios"
              onPress={handleUpdate}
              loading={loading === 'loading'}
            />
          </View>

          <View className="mt-3">
            <Button
              title="Cancelar"
              onPress={() => {
                setIsEditing(false);
                // Restaurar datos originales
                if (task) {
                  setFormData({
                    title: task.title,
                    description: task.description,
                  });
                  setErrors({});
                }
              }}
              variant="secondary"
              disabled={loading === 'loading'}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}