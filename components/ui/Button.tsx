import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
  disabled?: boolean;
}

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary',
  loading = false,
  disabled = false
}: ButtonProps) {
  const { theme } = useTheme();

  const getVariantStyles = () => {
    if (disabled || loading) {
      return { backgroundColor: theme.colors.textSecondary };
    }
    
    switch (variant) {
      case 'secondary':
        return { backgroundColor: theme.colors.textSecondary };
      case 'danger':
        return { backgroundColor: theme.colors.error };
      default:
        return { backgroundColor: theme.colors.primary };
    }
  };

  return (
    <TouchableOpacity
      style={{
        ...getVariantStyles(),
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <Text style={{ color: '#ffffff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}