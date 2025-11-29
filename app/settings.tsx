import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Sun, Moon, Leaf, Check, Info } from 'lucide-react-native';
import { useTheme } from '../hooks/useTheme';

export default function Settings() {
  const { theme, themeName, setTheme } = useTheme();

  const themeOptions = [
    { key: 'light', name: 'Claro', Icon: Sun },
    { key: 'dark', name: 'Oscuro', Icon: Moon },
    { key: 'green', name: 'Verde', Icon: Leaf },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ padding: 24 }}>
        <Text style={{ fontSize: 14, color: theme.colors.textSecondary, marginBottom: 24 }}>
          Personaliza la apariencia de tu aplicación
        </Text>

        {/* Sección de temas */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: theme.colors.text, marginBottom: 16 }}>
            Tema de la aplicación
          </Text>

          {themeOptions.map((option) => {
            const IconComponent = option.Icon;
            return (
              <TouchableOpacity
                key={option.key}
                onPress={() => setTheme(option.key)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: theme.colors.surface,
                  padding: 16,
                  borderRadius: 12,
                  marginBottom: 12,
                  borderWidth: 2,
                  borderColor: themeName === option.key ? theme.colors.primary : theme.colors.border,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: 20, 
                    backgroundColor: theme.colors.background,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12
                  }}>
                    <IconComponent size={20} color={theme.colors.primary} strokeWidth={2} />
                  </View>
                  <View>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: theme.colors.text }}>
                      {option.name}
                    </Text>
                    <Text style={{ fontSize: 12, color: theme.colors.textSecondary }}>
                      Tema {option.name.toLowerCase()}
                    </Text>
                  </View>
                </View>

                {themeName === option.key && (
                  <Check size={24} color={theme.colors.primary} strokeWidth={3} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Información de la app */}
        <View style={{ 
          backgroundColor: theme.colors.surface, 
          padding: 16, 
          borderRadius: 12, 
          borderWidth: 1, 
          borderColor: theme.colors.border,
          alignItems: 'center'
        }}>
          <Info size={24} color={theme.colors.textSecondary} strokeWidth={2} style={{ marginBottom: 8 }} />
          <Text style={{ fontSize: 14, color: theme.colors.textSecondary, textAlign: 'center' }}>
            TaskFlow AI v1.0.0
          </Text>
          <Text style={{ fontSize: 12, color: theme.colors.textSecondary, textAlign: 'center', marginTop: 4 }}>
            Gestión inteligente de tareas con IA
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}