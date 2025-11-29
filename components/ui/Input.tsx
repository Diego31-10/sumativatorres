import { View, Text, TextInput, TextInputProps } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  multiline?: boolean;
}

export default function Input({ 
  label, 
  error, 
  multiline = false,
  ...props 
}: InputProps) {
  const { theme } = useTheme();

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ color: theme.colors.text, fontWeight: '600', marginBottom: 8 }}>
        {label}
      </Text>
      <TextInput
        style={{
          backgroundColor: theme.colors.surface,
          borderWidth: 1,
          borderColor: error ? theme.colors.error : theme.colors.border,
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 12,
          color: theme.colors.text,
          fontSize: 16,
          minHeight: multiline ? 100 : 48,
          textAlignVertical: multiline ? 'top' : 'center',
        }}
        placeholderTextColor={theme.colors.textSecondary}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        {...props}
      />
      {error && (
        <Text style={{ color: theme.colors.error, fontSize: 14, marginTop: 4 }}>
          {error}
        </Text>
      )}
    </View>
  );
}