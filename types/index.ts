// Tipos para las tareas
export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
  }
  
  // Tipo para el formulario (sin id ni dates)
  export interface TaskFormData {
    title: string;
    description: string;
  }
  
  // Tipo para errores de validación
  export interface ValidationErrors {
    title?: string;
    description?: string;
  }

  export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

  export interface TasksContextType {
    // Estado
    tasks: Task[];
    loading: LoadingState;
    error: string | null;
    
    // Acciones
    fetchTasks: () => Promise<void>;
    addTask: (taskData: TaskFormData) => Promise<Task>;
    updateTask: (id: string, taskData: Partial<Task>) => Promise<Task>;
    removeTask: (id: string) => Promise<void>;
    toggleTask: (id: string) => Promise<void>;
    getTask: (id: string) => Task | undefined;
  }