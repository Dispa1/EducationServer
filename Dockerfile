# Используем Node.js версии 16.20.0
FROM node:16.20.0-alpine3.18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --legacy-peer-deps

# Копируем исходный код приложения
COPY . .

# Устанавливаем nodemon глобально
RUN npm install -g nodemon

# Запускаем TypeScript компиляцию без использования глобальной установки
RUN ./node_modules/.bin/tsc

# Команда для запуска приложения с помощью nodemon
CMD ["nodemon", "build/main.js"]
