import { useContext } from 'react';
import { TasksContext } from '../contexts/TasksContext';

/**
 * Hook personalizado para acceder al contexto de tareas
 * Lanza un error si se usa fuera del provider
 */
export function useTasks() {
  const context = useContext(TasksContext);
  
  if (context === undefined) {
    throw new Error('useTasks debe ser usado dentro de un TasksProvider');
  }
  
  return context;
}