# Usar una imagen base oficial de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json e instala dependencias si es necesario
COPY package*.json ./
RUN npm install

# Copiar archivos al contenedor
COPY . .

# Exponer el puerto en el que corre el servidor frontend (ajústalo si es otro)
EXPOSE 3000
 
# Ejecutar la app
CMD ["node", "index.js"]
