# Поиск организации по ИНН (DaData) — React + Vite

Простой проект: поле ввода ИНН (10 цифр), запрос к DaData, вывод результатов.

## Запуск
```
npm install
npm run dev
```
Откройте адрес из терминала (обычно `http://localhost:5173`).

## Токен
- По умолчанию используется публичный токен, чтобы любой мог проверить.
- Можно переопределить своим: создайте `.env` в корне и добавьте
```
VITE_DADATA_TOKEN=ВАШ_API_КЛЮЧ
```

## Структура
- `src/api/dadata.ts` — вызов API DaData (`findPartyById`).
- `src/features/inn/InnSearch.tsx` — компонент с логикой и UI.
- `src/features/inn/inn.css` — стили.

