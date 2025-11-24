import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

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
  const getVariantStyles = () => {
    if (disabled || loading) {
      return 'bg-gray-400';
    }
    
    switch (variant) {
      case 'secondary':
        return 'bg-gray-600 active:bg-gray-700';
      case 'danger':
        return 'bg-red-500 active:bg-red-600';
      default:
        return 'bg-blue-600 active:bg-blue-700';
    }
  };

  return (
    <TouchableOpacity
      className={`${getVariantStyles()} py-4 px-6 rounded-lg flex-row items-center justify-center`}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <Text className="text-white text-center font-bold text-base">
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}