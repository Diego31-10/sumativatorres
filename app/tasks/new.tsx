import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { TaskFormData, ValidationErrors } from '../../types';
import { validateTaskForm } from '../../lib/validation';

export default function NewTask() {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
  });
  
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    // Validar formulario
    const validationErrors = validateTaskForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Limpiar errores
    setErrors({});
    
    // Simular guardado (por ahora solo mostramos alerta)
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Tarea creada',
        `Título: ${formData.title}\nDescripción: ${formData.description}`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Limpiar formulario
              setFormData({ title: '', description: '' });
            }
          }
        ]
      );
    }, 1000);
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
              // Limpiar error al escribir
              if (errors.title) {
                setErrors({ ...errors, title: undefined });
              }
            }}
            error={errors.title}
          />

          <Input
            label="Descripción"
            placeholder="Ej: Comprar leche pan y huevos en el supermercado"
            value={formData.description}
            onChangeText={(text) => {
              setFormData({ ...formData, description: text });
              // Limpiar error al escribir
              if (errors.description) {
                setErrors({ ...errors, description: undefined });
              }
            }}
            error={errors.description}
            multiline
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