import { createContext, useState, useCallback, ReactNode } from 'react';
import { Task, TaskFormData, TasksContextType, LoadingState } from '../types';
import * as api from '../lib/api';

// Crear el contexto
export const TasksContext = createContext<TasksContextType | undefined>(undefined);

interface TasksProviderProps {
  children: ReactNode;
}

export function TasksProvider({ children }: TasksProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  /**
   * Obtener todas las tareas
   */
  const fetchTasks = useCallback(async () => {
    setLoading('loading');
    setError(null);
    
    try {
      const data = await api.getTasks();
      setTasks(data);
      setLoading('success');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar las tareas';
      setError(errorMessage);
      setLoading('error');
    }
  }, []);

  /**
   * Agregar una nueva tarea
   */
  const addTask = useCallback(async (taskData: TaskFormData): Promise<Task> => {
    setLoading('loading');
    setError(null);
    
    try {
      const newTask = await api.createTask(taskData);
      setTasks(prevTasks => [...prevTasks, newTask]);
      setLoading('success');
      return newTask;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear la tarea';
      setError(errorMessage);
      setLoading('error');
      throw err;
    }
  }, []);

  /**
   * Actualizar una tarea existente
   */
  const updateTask = useCallback(async (id: string, taskData: Partial<Task>): Promise<Task> => {
    setLoading('loading');
    setError(null);
    
    try {
      const updatedTask = await api.updateTask(id, taskData);
      setTasks(prevTasks =>
        prevTasks.map(task => (task.id === id ? updatedTask : task))
      );
      setLoading('success');
      return updatedTask;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar la tarea';
      setError(errorMessage);
      setLoading('error');
      throw err;
    }
  }, []);

  /**
   * Eliminar una tarea
   */
  const removeTask = useCallback(async (id: string): Promise<void> => {
    setLoading('loading');
    setError(null);
    
    try {
      await api.deleteTask(id);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      setLoading('success');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar la tarea';
      setError(errorMessage);
      setLoading('error');
      throw err;
    }
  }, []);

  /**
   * Alternar estado de completado de una tarea
   */
  const toggleTask = useCallback(async (id: string): Promise<void> => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    setLoading('loading');
    setError(null);
    
    try {
      const updatedTask = await api.toggleTaskCompletion(id, !task.completed);
      setTasks(prevTasks =>
        prevTasks.map(t => (t.id === id ? updatedTask : t))
      );
      setLoading('success');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cambiar estado';
      setError(errorMessage);
      setLoading('error');
      throw err;
    }
  }, [tasks]);

  /**
   * Obtener una tarea por ID (sin llamada a API, desde estado local)
   */
  const getTask = useCallback((id: string): Task | undefined => {
    return tasks.find(task => task.id === id);
  }, [tasks]);

  const value: TasksContextType = {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    removeTask,
    toggleTask,
    getTask,
  };

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
}