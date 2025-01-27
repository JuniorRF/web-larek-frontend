# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Типы:

**ПРОДУКТ:**
```
export interface IProductItem {
    "id": string,
    "description": string,
    "image": string,
    "title": string,
    "category": string,
    "price": number
}
```

**ЗАКАЗ:**
```
export interface IOrder {
    products: IProductItem[];
    totalPrice: number;
    addProduct(): void;
    deleteProduct(): void;
}
```

**Модульные окна:**
```
export interface IModal {
    "modal": string;
    open(): void;
    close(): void;
}
```

**Данные ПОЛЬЗОВАТЕЛЯ:**
```
export interface IUserData {
    payment: paymentMethod;
    address: string;
    email: string;
    telephone: string;
    setPayment(): void;
    setAddress(): void;
    setEmail(): void;
    setTelephone(): void;
}
```

## схема:

![схема](https://github.com/JuniorRF/web-larek-frontend/scheme.PNG "Схема")