# Imagen base
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Expone el puerto (ajusta si tu app usa otro)
EXPOSE 5000

# Comando por defecto para iniciar la app
CMD ["npm", "start"]