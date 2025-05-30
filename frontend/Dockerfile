# Usar una imagen base oficial de Node.js
FROM node:18

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Copiar archivos al contenedor
COPY . .

# Crear archivo de entrada para pruebas (opcional)
# RUN echo "console.log(require('./index')(2, 3));" > app.js

# Comando para ejecutar tu script (ajústalo según necesidad)
CMD ["node", "index.js"]
