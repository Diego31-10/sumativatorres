import { View, Text, TextInput, TextInputProps } from 'react-native';

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
  return (
    <View className="mb-4">
      <Text className="text-gray-700 font-semibold mb-2">
        {label}
      </Text>
      <TextInput
        className={`bg-white border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-lg px-4 py-3 text-gray-800`}
        placeholderTextColor="#9ca3af"
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        textAlignVertical={multiline ? 'top' : 'center'}
        {...props}
      />
      {error && (
        <Text className="text-red-500 text-sm mt-1">
          {error}
        </Text>
      )}
    </View>
  );
}