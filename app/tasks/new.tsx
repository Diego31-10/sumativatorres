import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import AISuggestionModal from '../../components/AISuggestionModal';
import { TaskFormData, ValidationErrors, AISuggestion } from '../../types';
import { validateTaskForm } from '../../lib/validation';
import { useTasks } from '../../hooks/useTasks';
import { suggestTaskImprovements, isAIConfigured } from '../../lib/ai';

export default function NewTask() {
  const { addTask, loading } = useTasks();
  
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
  });
  
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [aiLoading, setAiLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<AISuggestion | null>(null);

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

  const handleAISuggest = async () => {
    // Validar que hay contenido mínimo
    if (!formData.title.trim() || formData.title.trim().length < 3) {
      showAlert(
        '⚠️ Información insuficiente',
        'Por favor escribe al menos un título de 3 caracteres para que la IA pueda ayudarte.'
      );
      return;
    }

    // Verificar configuración de IA
    if (!isAIConfigured()) {
      showAlert(
        '⚠️ IA no configurada',
        'La API Key de Gemini no está configurada. Por favor contacta al administrador.'
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
        '❌ Error de IA',
        error instanceof Error ? error.message : 'No se pudieron generar sugerencias'
      );
    } finally {
      setAiLoading(false);
    }
  };

  const handleApplySuggestion = (suggestion: AISuggestion) => {
    // Aplicar las sugerencias al formulario
    setFormData({
      title: suggestion.improvedTitle,
      description: suggestion.improvedDescription,
    });
    
    // Limpiar errores
    setErrors({});
    
    // Cerrar modal
    setShowSuggestions(false);
    
    // Mostrar confirmación
    showAlert(
      '✅ Sugerencias aplicadas',
      'La IA ha mejorado tu tarea. Puedes editarla antes de guardar si lo deseas.'
    );
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
    
    try {
      // Crear tarea usando el contexto
      const newTask = await addTask(formData);
      
      showAlert(
        '✅ Tarea creada exitosamente',
        `"${newTask.title}" ha sido agregada.`,
        () => {
          // Limpiar formulario y navegar
          setFormData({ title: '', description: '' });
          router.push('/tasks');
        }
      );
      
    } catch (error) {
      showAlert(
        '❌ Error',
        error instanceof Error ? error.message : 'No se pudo crear la tarea'
      );
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView className="flex-1 bg-gray-50">
        <View className="p-6">
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            Nueva Tarea
          </Text>
          <Text className="text-gray-600 mb-6">
            Escribe tu tarea y deja que la IA te ayude a mejorarla
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
            label="Descripción (opcional)"
            placeholder="Ej: Comprar leche pan y huevos"
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
          <View className="mb-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4">
            <Text className="text-gray-700 text-sm mb-3">
              💡 ¿Necesitas ayuda? La IA puede mejorar tu tarea y sugerir subtareas
            </Text>
            <Button
              title={aiLoading ? "⏳ Consultando IA..." : "✨ Sugerir con IA"}
              onPress={handleAISuggest}
              loading={aiLoading}
              disabled={loading === 'loading'}
            />
          </View>

          <View className="mt-4">
            <Button
              title="Crear Tarea"
              onPress={handleSubmit}
              loading={loading === 'loading'}
              disabled={aiLoading}
            />
          </View>

          <View className="mt-3">
            <Button
              title="Cancelar"
              onPress={() => router.back()}
              variant="secondary"
              disabled={loading === 'loading' || aiLoading}
            />
          </View>
        </View>
      </ScrollView>

      {/* Modal de sugerencias de IA */}
      <AISuggestionModal
        visible={showSuggestions}
        suggestion={aiSuggestion}
        onApply={handleApplySuggestion}
        onClose={() => setShowSuggestions(false)}
      />
    </KeyboardAvoidingView>
  );
}