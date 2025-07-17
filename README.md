# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Backend (FastAPI)

1. Instala dependencias:
   ```sh
   pip install fastapi uvicorn pytesseract pillow pandas openpyxl
   ```
2. Ejecuta el backend:
   ```sh
   cd backend
   uvicorn main:app --reload
   ```

## Frontend (React + Vite)

1. Instala dependencias:
   ```sh
   npm install
   ```
2. Ejecuta el frontend:
   ```sh
   npm run dev
   ```

## Flujo
- Sube una imagen de factura desde la web.
- El backend extrae los datos y genera un archivo Excel descargable.

## Cómo compartir y ejecutar este programa localmente

1. **Requisitos previos**
   - Instalar [Node.js](https://nodejs.org/) (para el frontend)
   - Instalar [Python 3.10+](https://www.python.org/) (para el backend)
   - Instalar [Tesseract OCR](https://github.com/tesseract-ocr/tesseract) y agregarlo al PATH del sistema

2. **Descargar el proyecto**
   - Clona este repositorio o descomprime la carpeta del proyecto en tu computadora.

3. **Instalar dependencias del backend**
   - Abre una terminal y navega a la carpeta `backend`:
     ```sh
     cd backend
     pip install -r requirements.txt
     ```

4. **Iniciar el backend**
   ```sh
   uvicorn main:app --reload
   ```

5. **Instalar dependencias del frontend**
   - Abre otra terminal en la raíz del proyecto:
     ```sh
     npm install
     ```

6. **Iniciar el frontend**
   ```sh
   npm run dev
   ```

7. **Abrir la aplicación**
   - Ve a [http://localhost:5173/](http://localhost:5173/) en tu navegador.

¡Listo! Así cualquier persona podrá ejecutar el sistema localmente.
