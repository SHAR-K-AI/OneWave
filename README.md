This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
# One Wave
[Переглянути відео на YouTube](https://www.youtube.com/watch?v=PoDlpaFAbpE)
![One Wave](./public/images/readme-1.gif)

## Git HUB
[https://github.com/SHAR-K-AI/OneWave](https://github.com/SHAR-K-AI/OneWave)

# Інструкція для запуску проекту

## Створення файлу `.env.local`

1. Створіть файл `.env.local` на основі `.env.local.example`.
2. В файлі `.env.local` вкажіть правильну адресу API:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api/
```

## Запуск лише фронтенду `.env.local`

Для того, щоб запустити лише фронтенд, спершу потрібно встановити залежності та запустити сервер:

### Встановіть залежності:

```bash
npm install
```
### Запустіть фронтенд:

```bash
npm start
```
## Запуск сервера і фронтенду

### Для того, щоб запустити і сервер, і фронтенд, використовуйте команду:
```bash
yarn go
```
## Запуск сервера і фронтенду в режимі розробки

### Для того, щоб запустити сервер і фронтенд в режимі розробки, використовуйте команду:
```bash
yarn goDev
```
