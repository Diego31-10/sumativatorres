import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { Sparkles } from 'lucide-react-native';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import AISuggestionModal from '../../components/AISuggestionModal';
import { TaskFormData, ValidationErrors, AISuggestion } from '../../types';
import { validateTaskForm } from '../../lib/validation';
import { useTasks } from '../../hooks/useTasks';
import { useTheme } from '../../hooks/useTheme';
import { suggestTaskImprovements, isAIConfigured } from '../../lib/ai';

export default function NewTask() {
  const { addTask, loading } = useTasks();
  const { theme } = useTheme();
  
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
      'La IA ha mejorado tu tarea. Puedes editarla antes de guardar si lo deseas.'
    );
  };

  const handleSubmit = async () => {
    const validationErrors = validateTaskForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    
    try {
      const newTask = await addTask(formData);
      
      showAlert(
        'Tarea creada exitosamente',
        `"${newTask.title}" ha sido agregada.`,
        () => {
          setFormData({ title: '', description: '' });
          router.push('/tasks');
        }
      );
      
    } catch (error) {
      showAlert(
        'Error',
        error instanceof Error ? error.message : 'No se pudo crear la tarea'
      );
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <View style={{ padding: 24 }}>
          <Text style={{ color: theme.colors.textSecondary, marginBottom: 24 }}>
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
            label="Descripción"
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
              title="Crear Tarea"
              onPress={handleSubmit}
              loading={loading === 'loading'}
              disabled={aiLoading}
            />
          </View>

          <View style={{ marginTop: 12 }}>
            <Button
              title="Cancelar"
              onPress={() => router.back()}
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