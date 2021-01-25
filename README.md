# Youtube for Stalker/Ministra portal

Все настройки и API ключ в файле `apps/magcore-app-youtube/3.0.13/youtube.php`

## Обязательные действия:
- Поменять ключ `API_KEY` на свой / change your `API_KEY`

## Необязательные действия:
### English localization by default
- If you want by default English interface and keyboard then change `DEFAULT_LANGUAGE_ENGLISH` to __true__ in `apps/magcore-app-youtube/3.0.13/js/release.js`
- Trending and search localization settings in `apps/magcore-app-youtube/3.0.13/youtube.php`

### Поиск через API (если ключ с большой квотой):
- Поменять `API_SEARCH` на __true__

### Логирование поиска в папку .../logs/:
- Поменять `SEARCH_LOGS` на __true__
- Папке `apps/magcore-app-youtube/3.0.13/logs/` выдать права **0777** (или владелец web-сервер)

## Что нового:
#### 25.01.2021
- Восстановлено правильное отображение на главной, как это задумывалось первоначально автором:
Загружается первая и вторая полосы, далее при переходе вниз загружаются следующая и т.д. С учетом ограничения на 200 видео в трендах, если использовать по 50 результатов (стоит по умолчанию), то получится 4 полосы (другие значения не проверялись). Результаты кешируются.

#### 21.01.2021
- Рефакторинг release.js
- Отключена арабская раскладка
- Оставлено воспроизведение только через javascript

#### 18.01.2021
- Если в поиске найдется канал без видео, то в строке под кол-вом подписчиков будет не пустая строка, а строка "Нет видео"