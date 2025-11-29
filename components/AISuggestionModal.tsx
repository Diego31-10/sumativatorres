import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { X, Lightbulb, FileText, Pencil, Sparkles } from 'lucide-react-native';
import { AISuggestion } from '../types';
import { useTheme } from '../hooks/useTheme';
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
  const { theme } = useTheme();

  if (!suggestion) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
        <View style={{ 
          backgroundColor: theme.colors.surface, 
          borderTopLeftRadius: 24, 
          borderTopRightRadius: 24,
          maxHeight: '80%'
        }}>
          {/* Header */}
          <View style={{ 
            padding: 24, 
            borderBottomWidth: 1, 
            borderBottomColor: theme.colors.border 
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Sparkles size={24} color={theme.colors.primary} strokeWidth={2} />
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: theme.colors.text, marginLeft: 8 }}>
                  Sugerencias de IA
                </Text>
              </View>
              <TouchableOpacity onPress={onClose}>
                <X size={24} color={theme.colors.textSecondary} strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Contenido */}
          <ScrollView style={{ padding: 24 }}>
            {/* Razonamiento */}
            <View style={{ 
              backgroundColor: theme.colors.info + '15',
              borderRadius: 12, 
              padding: 16, 
              marginBottom: 24,
              borderWidth: 1,
              borderColor: theme.colors.info + '30'
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <Lightbulb size={20} color={theme.colors.info} strokeWidth={2} />
                <Text style={{ 
                  color: theme.colors.info, 
                  fontWeight: '600', 
                  marginLeft: 8,
                  fontSize: 16
                }}>
                  ¿Por qué estas sugerencias?
                </Text>
              </View>
              <Text style={{ color: theme.colors.text, fontSize: 14, lineHeight: 20 }}>
                {suggestion.reasoning}
              </Text>
            </View>

            {/* Título mejorado */}
            <View style={{ marginBottom: 24 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <Pencil size={18} color={theme.colors.textSecondary} strokeWidth={2} />
                <Text style={{ color: theme.colors.text, fontWeight: '600', marginLeft: 8 }}>
                  Título sugerido:
                </Text>
              </View>
              <View style={{ 
                backgroundColor: theme.colors.background, 
                borderRadius: 12, 
                padding: 16,
                borderWidth: 1,
                borderColor: theme.colors.border
              }}>
                <Text style={{ color: theme.colors.text, fontWeight: '500', fontSize: 16 }}>
                  {suggestion.improvedTitle}
                </Text>
              </View>
            </View>

            {/* Descripción mejorada */}
            <View style={{ marginBottom: 24 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <FileText size={18} color={theme.colors.textSecondary} strokeWidth={2} />
                <Text style={{ color: theme.colors.text, fontWeight: '600', marginLeft: 8 }}>
                  Descripción mejorada (incluye subtareas):
                </Text>
              </View>
              <View style={{ 
                backgroundColor: theme.colors.background, 
                borderRadius: 12, 
                padding: 16,
                borderWidth: 1,
                borderColor: theme.colors.border
              }}>
                <Text style={{ color: theme.colors.text, lineHeight: 22 }}>
                  {suggestion.improvedDescription}
                </Text>
              </View>
            </View>

            {/* Botones */}
            <View style={{ gap: 12, marginBottom: 24 }}>
              <Button
                title="Aplicar Sugerencias"
                onPress={() => onApply(suggestion)}
              />
              <Button
                title="Cancelar"
                onPress={onClose}
                variant="secondary"
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}