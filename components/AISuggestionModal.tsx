import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { AISuggestion } from '../types';
import Button from './ui/Button';

interface AISuggestionModalProps {
  visible: boolean;
  suggestion: AISuggestion | null;
  onApply: (suggestion: AISuggestion) => void;
  onClose: () => void;
}

export default function AISuggestionModal({
  visible,
  suggestion,
  onApply,
  onClose,
}: AISuggestionModalProps) {
  if (!suggestion) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl max-h-[80%]">
          {/* Header */}
          <View className="p-6 border-b border-gray-200">
            <View className="flex-row items-center justify-between">
              <Text className="text-2xl font-bold text-gray-800">
                ✨ Sugerencias de IA
              </Text>
              <TouchableOpacity onPress={onClose}>
                <Text className="text-gray-400 text-2xl">✕</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Contenido */}
          <ScrollView className="p-6">
            {/* Razonamiento */}
            <View className="bg-blue-50 rounded-lg p-4 mb-6">
              <Text className="text-blue-800 font-semibold mb-2">
                💡 ¿Por qué estas sugerencias?
              </Text>
              <Text className="text-blue-700 text-sm leading-5">
                {suggestion.reasoning}
              </Text>
            </View>

            {/* Título mejorado */}
            <View className="mb-6">
              <Text className="text-gray-700 font-semibold mb-2">
                📝 Título sugerido:
              </Text>
              <View className="bg-gray-50 rounded-lg p-4">
                <Text className="text-gray-800 font-medium">
                  {suggestion.improvedTitle}
                </Text>
              </View>
            </View>

            {/* Descripción mejorada (ya incluye subtareas) */}
            <View className="mb-6">
              <Text className="text-gray-700 font-semibold mb-2">
                📄 Descripción mejorada (incluye subtareas):
              </Text>
              <View className="bg-gray-50 rounded-lg p-4">
                <Text className="text-gray-800 leading-6">
                  {suggestion.improvedDescription}
                </Text>
              </View>
            </View>

            {/* Botones */}
            <View className="space-y-3">
              <Button
                title="✨ Aplicar Sugerencias"
                onPress={() => onApply(suggestion)}
              />
              <View className="mt-3">
                <Button
                  title="Cancelar"
                  onPress={onClose}
                  variant="secondary"
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}