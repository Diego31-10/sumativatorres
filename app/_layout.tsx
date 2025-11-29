import { Stack, router, usePathname } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Home, Settings } from 'lucide-react-native';
import { TasksProvider } from '../contexts/TasksContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { useTheme } from '../hooks/useTheme';

function LayoutContent() {
  const { theme } = useTheme();
  const pathname = usePathname();

  // Determinar si mostrar botón Home o Settings
  const isHome = pathname === '/';
  const showHomeButton = !isHome;

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackVisible: false, // ← QUITAR FLECHA DE VOLVER
        headerLeft: () => null, // ← ASEGURAR QUE NO APAREZCA NADA A LA IZQUIERDA
        headerRight: () =>
          showHomeButton ? (
            <TouchableOpacity onPress={() => router.push('/')} style={{ marginRight: 16 }}>
              <Home size={24} color="#fff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => router.push('/settings')} style={{ marginRight: 16 }}>
              <Settings size={24} color="#fff" />
            </TouchableOpacity>
          ),
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Inicio' }} />
      <Stack.Screen name="tasks/index" options={{ title: 'Mis Tareas' }} />
      <Stack.Screen name="tasks/new" options={{ title: 'Nueva Tarea' }} />
      <Stack.Screen name="tasks/[id]" options={{ title: 'Detalle de Tarea' }} />
      <Stack.Screen name="settings" options={{ title: 'Configuración' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <TasksProvider>
          <LayoutContent />
        </TasksProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}