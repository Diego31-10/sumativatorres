import { ValidationErrors, TaskFormData } from '../types';

/**
 * Valida que una cadena solo contenga caracteres alfanuméricos y espacios
 */
export const isAlphanumeric = (text: string): boolean => {
  const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]+$/;
  return regex.test(text);
};

/**
 * Valida los datos del formulario de tarea
 */
export const validateTaskForm = (data: TaskFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Validar título
  if (!data.title.trim()) {
    errors.title = 'El título es obligatorio';
  } else if (!isAlphanumeric(data.title)) {
    errors.title = 'El título solo puede contener letras, números y espacios';
  } else if (data.title.trim().length < 3) {
    errors.title = 'El título debe tener al menos 3 caracteres';
  }

  // Validar descripción
  if (!data.description.trim()) {
    errors.description = 'La descripción es obligatoria';
  } else if (!isAlphanumeric(data.description)) {
    errors.description = 'La descripción solo puede contener letras, números y espacios';
  } else if (data.description.trim().length < 10) {
    errors.description = 'La descripción debe tener al menos 10 caracteres';
  }

  return errors;
};