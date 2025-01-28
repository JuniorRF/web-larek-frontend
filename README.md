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

## Архитектура проекта

Код приложения разделен на слои согласно парадигме MVP:

- отображение - отображение данных на странице.
- данные - хранение и изменение данных
- взаимодействия - презентер - отображение и данные.

## Базовый код

### class Api:
[src/components/base/api.ts](src/components/base/api.ts)
Запрос сервера о таварах
методы: 'GET'|'POST' | 'PUT' | 'DELETE'

## Типы:

**ПРОДУКТ:**
класс продуктов, будет выгружаться с сервера и заполняться страница или модальное окно
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
класс заказа, количество товаров и общая цена.
метод ```addProduct``` добавляет в заказ продукт
метод ```deleteProduct``` удаляет из заказа продукт
```
export interface IOrder {
    products: IProductItem[];
    totalPrice: number;
    addProduct(id: string): void;
    deleteProduct(id: string): void;
}
```

**Модульные окна:**
Класс модального окна
получает информаций о типе модального окна (о товаре, форма для заполнении или заказ)
метод ```open``` открывает модальное окно
метод ```close``` закрывает модальное окно

```
export interface IModal {
    "modal": string;
    open(<T>): void;
    close(): void;
}
```

**Данные ПОЛЬЗОВАТЕЛЯ:**
Класс для хранения информации от пользователя.
- ```payment``` способ оплаты
- ```address``` адрес доставки
- ```email``` емайл
- ```telephone``` телефон для связи
#### Методы ```set``` для установки значений

```
export interface IUserData {
    payment: paymentMethod;
    address: string;
    email: string;
    telephone: string;
    setPayment(payment: string): void;
    setAddress(address: string): void;
    setEmail(email: string): void;
    setTelephone(telephone: string): void;
}
```
### class EventEmitter:
слушатель событий от пользователя.




## схема:

![схема](scheme.PNG "Схема")