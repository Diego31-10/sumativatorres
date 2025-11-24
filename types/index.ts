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