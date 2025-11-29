# 📱 TaskFlow AI

<div align="center">

![TaskFlow AI Logo](https://img.shields.io/badge/TaskFlow-AI-blue?style=for-the-badge&logo=react)

**Gestión Inteligente de Tareas Potenciada por IA**

Una aplicación móvil moderna desarrollada con React Native y Expo que combina la simplicidad de un gestor de tareas con el poder de la Inteligencia Artificial de Google Gemini.

[![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-000020?style=flat&logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[Características](#-características-principales) • [Capturas](#-capturas-de-pantalla) • [Tecnologías](#%EF%B8%8F-tecnologías-utilizadas) • [Arquitectura](#-arquitectura-del-proyecto) • [Video](#%EF%B8%8Fvideo-explicativo) • [Autor](#%E2%80%8D-autor)

</div>

---

## 📋 Descripción

**TaskFlow AI** es una aplicación móvil de gestión de tareas que revoluciona la forma en que organizas tu día a día. Construida con las últimas tecnologías de desarrollo móvil multiplataforma y potenciada por **Google Gemini AI**, la aplicación no solo te permite crear, editar y organizar tareas, sino que también te asiste inteligentemente en la redacción y estructuración de las mismas.

### 💡 ¿Qué hace especial a TaskFlow AI?

- **Asistente IA Integrado**: Google Gemini sugiere mejoras en títulos, reescribe descripciones y propone subtareas automáticamente
- **Sistema de Temas**: Personaliza tu experiencia con temas Claro, Oscuro y Verde
- **Arquitectura Profesional**: Código limpio, modular y escalable siguiendo las mejores prácticas
- **Validaciones Inteligentes**: Garantiza la calidad de los datos ingresados
- **Interfaz Moderna**: UI/UX intuitiva con iconos profesionales de Lucide

---

## ✨ Características Principales

### 🎯 Gestión Completa de Tareas (CRUD)

- ✅ **Crear tareas** con título y descripción detallada
- 📝 **Editar tareas** existentes en cualquier momento
- 🗑️ **Eliminar tareas** con confirmación de seguridad
- ✔️ **Marcar como completadas** con un simple toque
- 📋 **Visualizar todas tus tareas** en una lista ordenada

### 🤖 Inteligencia Artificial con Google Gemini

- 💬 **Mejora automática de títulos**: Transforma títulos simples en títulos claros y accionables
- 📄 **Reescritura de descripciones**: Genera descripciones más estructuradas y detalladas
- 📌 **Sugerencia de subtareas**: Descompone tareas complejas en pasos más pequeños
- 🧠 **Razonamiento explicado**: Entiende por qué la IA sugiere cada mejora

### 🎨 Personalización y Temas

- ☀️ **Tema Claro**: Ideal para uso diurno
- 🌙 **Tema Oscuro**: Perfecto para ambientes con poca luz
- 🌿 **Tema Verde**: Opción fresca y diferente
- 💾 **Persistencia**: Tu tema favorito se guarda automáticamente

### 🔒 Validaciones y Seguridad

- ✅ Campos obligatorios verificados
- 🔤 Validación de caracteres permitidos
- 📏 Límites de longitud configurados
- ⚠️ Mensajes de error claros y contextuales

### 🎯 Experiencia de Usuario

- 🔄 **Pull-to-refresh**: Actualiza tus tareas con un gesto
- 🏠 **Navegación intuitiva**: Botones de Home y Configuración siempre accesibles
- ⚡ **Carga rápida**: Estados de loading visuales
- 📱 **Diseño responsive**: Se adapta perfectamente a cualquier pantalla

---

## 📸 Capturas de Pantalla

<div align="center">

### Pantalla Principal
<img width="300" height="auto" alt="image" src="https://github.com/user-attachments/assets/77bf799a-59b7-4595-95be-118133952a98" />

### Crear Tarea con IA
<img width="300" height="auto" alt="image" src="https://github.com/user-attachments/assets/819b3031-fc2d-441a-8a31-db5e73f49db5" />
&nbsp &nbsp
<img width="300" height="auto" alt="image" src="https://github.com/user-attachments/assets/fdf3360a-d34f-4126-9602-f7c89d2df46f" />


### Ver tareas
<img width="300" height="auto" alt="image" src="https://github.com/user-attachments/assets/8ee0862b-94c4-4710-bfb8-7558e7c1f9e9" />
&nbsp &nbsp
<img width="300" height="auto" alt="image" src="https://github.com/user-attachments/assets/b2df32dc-8a3f-4009-8e46-745946a00ac1" />
&nbsp &nbsp
<img width="300" height="auto" alt="image" src="https://github.com/user-attachments/assets/95be39c3-0153-4b1e-80db-c50cd64d9e5f" />



### Selector de Temas
<img width="300" height="auto" alt="image" src="https://github.com/user-attachments/assets/d2f13082-f280-4b48-9a7e-614a2861b3a5" />
&nbsp &nbsp
<img width="300" height="auto" alt="image" src="https://github.com/user-attachments/assets/efb2ed2f-00df-4452-8e36-a085413ee926" />
&nbsp &nbsp
<img width="300" height="auto" alt="image" src="https://github.com/user-attachments/assets/f10ef415-07b9-4fe3-a7e5-4eaf163f5828" />


</div>

---

## 🛠️ Tecnologías utilizadas

### Core

- **React Native** - Framework de desarrollo móvil multiplataforma
- **Expo** - Plataforma para desarrollo y despliegue de apps React Native
- **TypeScript** - Tipado estático para JavaScript
- **Expo Router** - Enrutamiento basado en archivos

### UI/UX

- **NativeWind** - Tailwind CSS para React Native
- **Lucide React Native** - Iconos profesionales y modernos

### Estado y Datos

- **Context API** - Gestión de estado global
- **Axios** - Cliente HTTP para peticiones a la API
- **AsyncStorage** - Persistencia local de configuraciones

### Backend Simulado

- **json-server** - API REST simulada para desarrollo

### Inteligencia Artificial

- **Google Generative AI** - SDK oficial de Google Gemini
- **Gemini 2.5 Pro** - Modelo de lenguaje para sugerencias inteligentes

---

## 📁 Arquitectura del Proyecto
```
TaskFlowAI/
├── app/                          # Rutas de la aplicación (Expo Router)
│   ├── tasks/
│   │   ├── index.tsx            # Lista de tareas
│   │   ├── new.tsx              # Crear nueva tarea
│   │   └── [id].tsx             # Detalle/Editar tarea
│   ├── settings.tsx             # Configuración de temas
│   ├── index.tsx                # Pantalla principal
│   └── _layout.tsx              # Layout global con navegación
│
├── components/                   # Componentes reutilizables
│   ├── ui/
│   │   ├── Button.tsx           # Botón personalizado
│   │   └── Input.tsx            # Campo de texto
│   ├── TaskCard.tsx             # Tarjeta de tarea
│   └── AISuggestionModal.tsx    # Modal de sugerencias IA
│
├── contexts/                     # Contextos de React
│   ├── TasksContext.tsx         # Estado global de tareas
│   └── ThemeContext.tsx         # Estado global de temas
│
├── hooks/                        # Hooks personalizados
│   ├── useTasks.ts              # Hook para gestión de tareas
│   └── useTheme.ts              # Hook para temas
│
├── lib/                          # Lógica de negocio
│   ├── api.ts                   # Cliente API REST
│   ├── ai.ts                    # Integración con Gemini
│   ├── validation.ts            # Validaciones de formularios
│   └── themes.ts                # Definición de temas
│
├── types/                        # Tipos TypeScript
│   └── index.ts                 # Interfaces y tipos
│
├── db.json                       # Base de datos simulada
├── .env                          # Variables de entorno (no en git)
├── .env.example                  # Plantilla de variables
└── README.md                     # Este archivo
```

### Patrones de Arquitectura Utilizados

- **Arquitectura por capas**: Separación clara entre UI, lógica y datos
- **Context API Pattern**: Estado global compartido sin prop drilling
- **Custom Hooks Pattern**: Lógica reutilizable encapsulada
- **Compound Components**: Componentes UI modulares y componibles
- **File-based Routing**: Enrutamiento intuitivo con Expo Router

---

## 📽️Video explicativo

<div align="left">
  <a  target="_blank" href="https://youtu.be/05l8pKeD7Cg" >
    <img 
      src="https://img.shields.io/badge/Ver%20video%20en%20YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white"
      alt="Ver video"
    />
  </a>
</div>

---

## 👨‍💻 Autor

**Diego Torres**

- GitHub: [@Diego31-10](https://github.com/Diego31-10)
- Email: diegoantv31@gmail.com
- Fortnite: Diegral.

---

## 🙏 Agradecimientos

- **Google** por proporcionar acceso gratuito a Gemini AI
- **Expo** por simplificar el desarrollo móvil
- **ClaudeAI** por ayuda guiada para programar
- **Profe Milo** por ser tan crack

---

<div align="center">

Hecho con ❤️ y ☕ 

</div>
