# APP
##### packages/app

Это главный пакет, который вбирает в себя остальные модули и собирается в обычное SPA-приложение с помощью `react-scripts`. Именно его билд необходимо деплоить на целевые сервера.

#####Для локальной развертки и разработки
При разработке и отладке использовался `json-server`. Его база расположена в папке `.mock`, это в общем обычный json-файл. Он разворачивается локально на 3000 порту. Чтобы его развернуть, нужно в папке `.mock` в терминале выполнить `json-server db.json`. Сервер автоматически сохраняет все действия в `db.json`. Документация: https://github.com/typicode/json-server.


#####Тестирование
Тесты через `JEST` с применением `Enzyme`, саги тестируются через `redux-saga-test-plan`.
Документация по `redux-saga-test-plan`: http://redux-saga-test-plan.jeremyfairbank.com

По вопросам старта и настройки `JEST` под тестирование компонентов `React`, `Enzyme` и `Babel`:
https://jestjs.io/docs/en/getting-started#generate-a-basic-configuration-file
https://jest-bot.github.io/jest/docs/tutorial-react.html#content
https://babeljs.io/docs/en/babel-preset-react/
https://babeljs.io/docs/en/babel-preset-env#targets

Файлы конфигурации, с которыми всё заработало у меня - в репозитории. 

Хорошая статья с основами `Enzyme`: https://blog.bitsrc.io/how-to-test-react-components-using-jest-and-enzyme-fab851a43875

Для тестов компонентов с передаваемыми в них данными вместо создания переменных в тестах применяются вызовы из mock-api на `json-server`. По запуску и документации см. выше "Для локальной развертки и разработки". Обращения к серверу вынесены в отдельный модуль `testApiCall`, расположенный в папке `utils`. Тесты используют методы из `hashTables` из той же папки.

Чтобы слать запросы в базу данных в devDependency установлен axios. Fetch API не работает в среде тестирования Node (а тесты запускаются именно там).