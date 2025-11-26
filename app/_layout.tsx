import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TasksProvider } from '../contexts/TasksContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <TasksProvider>
        <Stack>
          <Stack.Screen 
            name="index" 
            options={{ 
              title: 'TaskFlow AI',
              headerStyle: {
                backgroundColor: '#3b82f6',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }} 
          />
          <Stack.Screen 
            name="tasks/index" 
            options={{ 
              title: 'Mis Tareas',
              headerStyle: {
                backgroundColor: '#3b82f6',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }} 
          />
          <Stack.Screen 
            name="tasks/new" 
            options={{ 
              title: 'Nueva Tarea',
              headerStyle: {
                backgroundColor: '#3b82f6',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }} 
          />
          <Stack.Screen 
            name="tasks/[id]" 
            options={{ 
              title: 'Detalle de Tarea',
              headerStyle: {
                backgroundColor: '#3b82f6',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }} 
          />
        </Stack>
      </TasksProvider>
    </SafeAreaProvider>
  );
}