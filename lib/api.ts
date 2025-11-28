import axios from 'axios';
import { Task, TaskFormData } from '../types';

// URL de la API - cambiar según el dispositivo
const API_BASE_URL = 'https://3000-firebase-sumativatorres-1764016185024.cluster-lqzyk3r5hzdcaqv6zwm7wv6pwa.cloudworkstations.dev';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Obtiene todas las tareas
 */
export const getTasks = async (): Promise<Task[]> => {
  console.log('📡 GET /tasks');
  const response = await api.get<Task[]>('/tasks');
  console.log('✅ Tareas obtenidas:', response.data.length);
  return response.data;
};

/**
 * Obtiene una tarea por ID
 */
export const getTaskById = async (id: string): Promise<Task> => {
  console.log('📡 GET /tasks/' + id);
  const response = await api.get<Task>(`/tasks/${id}`);
  console.log('✅ Tarea obtenida:', response.data.title);
  return response.data;
};

/**
 * Crea una nueva tarea
 */
export const createTask = async (taskData: TaskFormData): Promise<Task> => {
  const newTask = {
    id: String(Date.now()), 
    ...taskData,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  
  console.log('📡 POST /tasks');
  console.log('📤 Enviando:', newTask);
  
  const response = await api.post<Task>('/tasks', newTask);
  
  console.log('✅ Tarea creada:', response.data);
  return response.data;
};

/**
 * Actualiza una tarea existente
 */
export const updateTask = async (id: string, taskData: Partial<Task>): Promise<Task> => {
  console.log('📡 PATCH /tasks/' + id);
  const response = await api.patch<Task>(`/tasks/${id}`, taskData);
  console.log('✅ Tarea actualizada:', response.data.title);
  return response.data;
};

/**
 * Elimina una tarea
 */
export const deleteTask = async (id: string): Promise<void> => {
  console.log('📡 DELETE /tasks/' + id);
  await api.delete(`/tasks/${id}`);
  console.log('✅ Tarea eliminada');
};

/**
 * Marca una tarea como completada/no completada
 */
export const toggleTaskCompletion = async (id: string, completed: boolean): Promise<Task> => {
  console.log('📡 PATCH /tasks/' + id + ' - completed:', completed);
  const response = await api.patch<Task>(`/tasks/${id}`, { completed });
  console.log('✅ Estado actualizado');
  return response.data;
};