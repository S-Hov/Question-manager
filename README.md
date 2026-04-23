# Question Manager

A small vanilla JavaScript confirmation/question modal. It creates a lightweight dialog, returns the user's choice as a Promise, supports custom button labels, optional auto-timeout, and can be styled with CSS variables.

## Features

- Vanilla JavaScript, no framework dependency
- Promise-based API with `async/await`
- Custom message, confirm text, and cancel text
- Optional countdown timer
- Click outside the modal to cancel
- `closeAll()` helper for closing active dialogs
- Responsive CSS for mobile screens

## Files

- `question-manager.js` - the `QuestionManager` class
- `question-manager.css` - modal styles

## Quick Start

Add the CSS file and import the JavaScript module:

```html
<link rel="stylesheet" href="./question-manager.css">

<button id="delete-button">Delete</button>

<script type="module">
    import { QuestionManager } from './question-manager.js'

    const questionManager = new QuestionManager()

    document.querySelector('#delete-button').addEventListener('click', async () => {
        const confirmed = await questionManager.ask({
            message: 'Delete this project?',
            confirmText: 'Delete',
            cancelText: 'Cancel'
        })

        if (confirmed) {
            console.log('Deleted')
        } else {
            console.log('Cancelled')
        }
    })
</script>
```

## API

### `new QuestionManager()`

Creates a manager instance. The class uses a singleton pattern, so repeated calls return the same instance.

### `questionManager.ask(options)`

Shows a modal and returns a `Promise<boolean>`.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `message` | `string` | `'Are you sure?'` | Text shown inside the modal |
| `confirmText` | `string` | `'Confirm'` | Confirm button label |
| `cancelText` | `string` | `'Cancel'` | Cancel button label |
| `showButtons` | `boolean` | `true` | Shows or hides action buttons |
| `timer` | `number \| null` | `null` | Countdown in seconds before auto-cancel |
| `onTimeout` | `function \| null` | `null` | Callback called when the timer reaches zero |

Returns:

- `true` when the user confirms
- `false` when the user cancels, clicks outside the modal, or the timer expires

### `questionManager.closeAll()`

Closes all active question modals and resolves their Promises with `false`.

## Timer Example

```js
const result = await questionManager.ask({
    message: 'Continue waiting?',
    confirmText: 'Yes',
    cancelText: 'No',
    timer: 10,
    onTimeout: () => {
        console.log('Question timed out')
    }
})
```

## Styling

The component works with its default CSS and also supports optional project-level CSS variables:

```css
:root {
    --box-border-1: 1px solid rgba(0, 0, 0, 0.12);
    --shadow: 0 18px 48px rgba(0, 0, 0, 0.18);
    --text-color-1: #ffffff;
    --text-color-2: #202124;
    --gradient-bg-2: linear-gradient(135deg, #6366f1, #8b5cf6);
}
```

The question icon uses Font Awesome classes (`fa-regular fa-circle-question`). If Font Awesome is not loaded, the dialog still works; only the icon will not be visible.

## Notes

- User-facing text is inserted with `textContent`, so messages and button labels are not executed as HTML.
- The module does not require a build step when used through `<script type="module">`.
- If you use a bundler, you can import the JS module normally and include the CSS through your bundler's CSS pipeline.

---

# Question Manager RU

Небольшой vanilla JavaScript менеджер вопросов и подтверждений. Он создает легкое модальное окно, возвращает выбор пользователя через Promise, поддерживает кастомные тексты кнопок, таймер автозакрытия и настройку внешнего вида через CSS-переменные.

## Возможности

- Чистый JavaScript без фреймворков
- Promise API с удобной работой через `async/await`
- Настраиваемый текст сообщения, кнопки подтверждения и кнопки отмены
- Опциональный таймер обратного отсчета
- Отмена по клику вне модального окна
- Метод `closeAll()` для закрытия активных окон
- Адаптивные стили для мобильных экранов

## Файлы

- `question-manager.js` - класс `QuestionManager`
- `question-manager.css` - стили модального окна

## Быстрый старт

Подключите CSS-файл и импортируйте JavaScript-модуль:

```html
<link rel="stylesheet" href="./question-manager.css">

<button id="delete-button">Удалить</button>

<script type="module">
    import { QuestionManager } from './question-manager.js'

    const questionManager = new QuestionManager()

    document.querySelector('#delete-button').addEventListener('click', async () => {
        const confirmed = await questionManager.ask({
            message: 'Удалить этот проект?',
            confirmText: 'Удалить',
            cancelText: 'Отмена'
        })

        if (confirmed) {
            console.log('Удалено')
        } else {
            console.log('Отменено')
        }
    })
</script>
```

## API

### `new QuestionManager()`

Создает экземпляр менеджера. В классе используется singleton-подход, поэтому повторные вызовы вернут тот же экземпляр.

### `questionManager.ask(options)`

Показывает модальное окно и возвращает `Promise<boolean>`.

| Опция | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `message` | `string` | `'Are you sure?'` | Текст внутри модального окна |
| `confirmText` | `string` | `'Confirm'` | Текст кнопки подтверждения |
| `cancelText` | `string` | `'Cancel'` | Текст кнопки отмены |
| `showButtons` | `boolean` | `true` | Показывает или скрывает кнопки |
| `timer` | `number \| null` | `null` | Таймер в секундах до автоотмены |
| `onTimeout` | `function \| null` | `null` | Callback, который вызывается при завершении таймера |

Возвращаемое значение:

- `true`, если пользователь подтвердил действие
- `false`, если пользователь отменил действие, кликнул вне окна или истек таймер

### `questionManager.closeAll()`

Закрывает все активные модальные окна и завершает их Promises значением `false`.

## Пример с таймером

```js
const result = await questionManager.ask({
    message: 'Продолжить ожидание?',
    confirmText: 'Да',
    cancelText: 'Нет',
    timer: 10,
    onTimeout: () => {
        console.log('Время вышло')
    }
})
```

## Стилизация

Компонент работает со стандартными стилями, а также поддерживает CSS-переменные проекта:

```css
:root {
    --box-border-1: 1px solid rgba(0, 0, 0, 0.12);
    --shadow: 0 18px 48px rgba(0, 0, 0, 0.18);
    --text-color-1: #ffffff;
    --text-color-2: #202124;
    --gradient-bg-2: linear-gradient(135deg, #6366f1, #8b5cf6);
}
```

Иконка вопроса использует классы Font Awesome (`fa-regular fa-circle-question`). Если Font Awesome не подключен, модальное окно продолжит работать, но иконка не будет отображаться.

## Заметки

- Пользовательский текст вставляется через `textContent`, поэтому сообщения и подписи кнопок не выполняются как HTML.
- Модуль не требует сборки при подключении через `<script type="module">`.
- Если вы используете сборщик, импортируйте JS-модуль обычным способом, а CSS подключайте через CSS pipeline вашего проекта.
