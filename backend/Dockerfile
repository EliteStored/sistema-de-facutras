# Dockerfile para FastAPI + Tesseract OCR en Render
FROM python:3.12-slim

# Instala Tesseract OCR y dependencias
RUN apt-get update && \
    apt-get install -y tesseract-ocr libtesseract-dev libleptonica-dev && \
    rm -rf /var/lib/apt/lists/*

# Crea directorio de trabajo
WORKDIR /app

# Copia los archivos del backend
COPY . /app

# Instala dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Expone el puerto 10000
EXPOSE 10000

# Comando para iniciar FastAPI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "10000"]
