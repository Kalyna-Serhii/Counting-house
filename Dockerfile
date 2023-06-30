# Используем официальный образ Node.js в качестве базового образа
FROM node:16

# Установка рабочей директории внутри контейнера
WORKDIR /app

# Копирование package.json и package-lock.json в контейнер
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование остальных файлов проекта в контейнер
COPY .. .

# Определение команды, которая будет запускаться при старте контейнера
CMD [ "npm", "start" ]


#FROM node
#
#WORKDIR /app
#
#COPY package.json .
#
#RUN npm install
#
#COPY . .
#
#EXPOSE 3000
#
#CMD ["node", "app.js"]
