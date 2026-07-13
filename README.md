# 🎬 MovieRate - React Native Mobile App

Una aplicación móvil moderna de catálogo y calificación de películas desarrollada con **React Native** y **Expo Go**. El proyecto consume datos en tiempo real de la API internacional de **The Movie Database (TMDb)**, implementa ruteo nativo, optimización de búsquedas y almacenamiento local persistente.

---

## 🚀 Características Principales

- **Cartelera en Vivo:** Listado de películas en cartelera con actualización en tiempo real, consumo asincrónico con Axios y manejo de estados de carga (`ActivityIndicator`).
- **Navegación Fluida:** Ruteo dinámico basado en componentes con `react-router-native` para navegar limpiamente entre la Home, Buscador y los Detalles.
- **Buscador Inteligente con Debounce:** Barra de búsqueda optimizada con un Custom Hook que retrasa las peticiones HTTP (500ms) mientras el usuario escribe, evitando saturar la API.
- **Reseñas y Calificaciones:** Sistema completo para que la comunidad deje su nombre, puntuación de estrellas (1 al 5) y comentarios.
- **Formularios Validados:** Formulario robusto desarrollado con `Formik` y blindado con reglas estrictas de validación de datos a través de `Yup`.
- **Persistencia de Datos Local:** Uso de `@react-native-async-storage/async-storage` para grabar las opiniones de los usuarios directamente en el disco del celular, manteniéndolas vivas al cerrar la app.
- ** Tolerancia a Fallos:** Manejo global de errores de red con pantallas informativas y botón de "Reintentar" conexión.
- **Seguridad (Variables de Entorno):** Configuración profesional mediante el sistema `EXPO_PUBLIC_` para ocultar y proteger los tokens de autenticación de la API.

---

## 🛠️ Tecnologías y Librerías Utilizadas

- **React Native** (SDK 54 de Expo)
- **React Router Native v6** (Navegación nativa)
- **Axios** (Cliente HTTP para peticiones)
- **Formik** & **Yup** (Estructura y validación de formularios)
- **AsyncStorage** (Base de datos local en dispositivo)
- **Modo Oscuro Personalizado** (Sistema de temas centralizado)

---

## 📦 Instalación y Configuración Local

Si deseas clonar este proyecto y ejecutarlo en tu propio entorno de desarrollo, sigue estos pasos:

### 1. Clonar el repositorio
```bash
git clone [https://github.com/TU_USUARIO_DE_GITHUB/TU_REPOSITORIO.git](https://github.com/TU_USUARIO_DE_GITHUB/TU_REPOSITORIO.git)
cd TU_REPOSITORIO
```

### 2. Instalar las dependencias

Instala los módulos necesarios asegurando la compatibilidad del entorno:

```bash
npm install --legacy-peer-deps
```

### 3. Configurar la API Key (Variables de Entorno)

Para interactuar con el catálogo de películas, necesitas obtener una API Key (Bearer Token) gratuita en The Movie Database.

Crea un archivo llamado .env en la raíz de tu proyecto y agrega tu credencial secreta:

EXPO_PUBLIC_TMDB_API_KEY=tu_bearer_token_aqui

(Nota: El archivo .env se encuentra protegido en el .gitignore por buenas prácticas de seguridad).

### 4. Iniciar la Aplicación

Corre el servidor de desarrollo de Metro Bundler:

```bash
npx expo start -c
```
Escanea el código QR generado en tu terminal desde la aplicación Expo Go instalada en tu dispositivo Android o iOS para ver la app en acción.

