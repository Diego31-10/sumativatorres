import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { TaskFormData, ValidationErrors } from '../../types';
import { validateTaskForm } from '../../lib/validation';
import { createTask } from '../../lib/api';

export default function NewTask() {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
  });
  
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loading, setLoading] = useState(false);

  const showAlert = (title: string, message: string, onOk?: () => void) => {
    if (Platform.OS === 'web') {
      // En web usar alert nativo del navegador
      alert(`${title}\n\n${message}`);
      if (onOk) onOk();
    } else {
      // En móvil usar Alert de React Native
      const { Alert } = require('react-native');
      Alert.alert(title, message, [
        {
          text: 'OK',
          onPress: onOk
        }
      ]);
    }
  };

  const handleSubmit = async () => {
    // Validar formulario
    const validationErrors = validateTaskForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Limpiar errores
    setErrors({});
    setLoading(true);
    
    try {
      // Crear tarea en la API
      const newTask = await createTask(formData);
      
      showAlert(
        '✅ Tarea creada exitosamente',
        `"${newTask.title}" ha sido agregada.`,
        () => {
          // Limpiar formulario y navegar
          setFormData({ title: '', description: '' });
          router.push('/');
        }
      );
      
    } catch (error) {
      showAlert(
        '❌ Error',
        error instanceof Error ? error.message : 'No se pudo crear la tarea'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView className="flex-1 bg-gray-50">
        <View className="p-6">
          <Text className="text-2xl font-bold text-gray-800 mb-6">
            Nueva Tarea
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
            editable={!loading}
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
            editable={!loading}
          />

          <View className="mt-4">
            <Button
              title="Crear Tarea"
              onPress={handleSubmit}
              loading={loading}
            />
          </View>

          <View className="mt-3">
            <Button
              title="Cancelar"
              onPress={() => router.back()}
              variant="secondary"
              disabled={loading}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}