# Youtube for Stalker/Ministra portal

Все настройки и API ключ в файле `apps/magcore-app-youtube/3.0.13/youtube.php`

## Обязательные действия:
- Поменять ключ `API_KEY` на свой / change your `API_KEY`
- Папке `apps/magcore-app-youtube/3.0.13/cache/` выдать права **0777** (или владелец web-сервер)

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
#### 26.01.2021
- Кеширование трендов на стороне сервера (по умолчанию 15 минут)
Тренды меняются не так часто, поэтому для каждого клиента делать запрос смысла нет + из кеша загружается шустрее.

#### 25.01.2021
- Восстановлено правильное отображение на главной, как это задумывалось первоначально автором:
Загружаются первая и вторая полосы, далее при переходе вниз загружается следующая и т.д. Результаты кешируются на клиенте.

#### 21.01.2021
- Рефакторинг release.js
- Отключена арабская раскладка
- Оставлено воспроизведение только через javascript