import { GoogleGenerativeAI } from '@google/generative-ai';
import { AISuggestion } from '../types';

// Obtener API key desde variables de entorno
const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';

// Inicializar Google Generative AI
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

/**
 * Genera sugerencias inteligentes para mejorar una tarea
 * @param title - Título actual de la tarea
 * @param description - Descripción actual de la tarea
 * @returns Sugerencias de mejora
 */
export async function suggestTaskImprovements(
  title: string,
  description: string
): Promise<AISuggestion> {
  try {
    // Obtener el modelo Gemini Pro
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Crear el prompt para Gemini
    const prompt = `
Eres un asistente experto en productividad y gestión de tareas.

Un usuario ha creado la siguiente tarea:

TÍTULO: "${title}"
DESCRIPCIÓN: "${description}"

Tu trabajo es ayudar a mejorar esta tarea proporcionando:

1. **Título mejorado**: Un título más claro, conciso y accionable (máximo 50 caracteres)
2. **Descripción mejorada**: Una descripción más detallada, estructurada y útil (máximo 200 caracteres)
3. **Subtareas sugeridas**: Una lista de 3-5 subtareas específicas que ayuden a completar la tarea principal
4. **Razonamiento**: Una breve explicación de por qué hiciste estas sugerencias

REGLAS IMPORTANTES:
- Usa solo letras, números y espacios (sin caracteres especiales como @#$%&*)
- Mantén un tono profesional pero amigable
- Las subtareas deben ser accionables y específicas
- Si el título/descripción original ya es bueno, haz mejoras sutiles

Responde ÚNICAMENTE en formato JSON válido con esta estructura exacta:
{
  "improvedTitle": "tu título mejorado aquí",
  "improvedDescription": "tu descripción mejorada aquí",
  "subtasks": ["subtarea 1", "subtarea 2", "subtarea 3"],
  "reasoning": "tu explicación breve aquí"
}

NO agregues texto adicional fuera del JSON. Solo el JSON puro.
`.trim();

    // Generar contenido
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parsear la respuesta JSON
    // Limpiar el texto por si Gemini agrega markdown
    const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
    const suggestion: AISuggestion = JSON.parse(cleanText);

    // Validar que la respuesta tenga la estructura correcta
    if (
      !suggestion.improvedTitle ||
      !suggestion.improvedDescription ||
      !Array.isArray(suggestion.subtasks) ||
      !suggestion.reasoning
    ) {
      throw new Error('Respuesta de IA inválida');
    }

    return suggestion;
  } catch (error) {
    console.error('Error al generar sugerencias con IA:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('API_KEY_INVALID')) {
        throw new Error('API Key de Gemini inválida. Por favor verifica tu archivo .env');
      }
      throw new Error(`Error de IA: ${error.message}`);
    }
    
    throw new Error('No se pudieron generar sugerencias. Intenta de nuevo.');
  }
}

/**
 * Verifica si la API key está configurada
 */
export function isAIConfigured(): boolean {
  // Verificar que la key no esté vacía y tenga un formato válido
  return GEMINI_API_KEY.length > 0 && GEMINI_API_KEY.startsWith('AIza');
}