# Youtube for Stalker/Ministra portal

&#127479;&#127482; Все настройки и API ключ в файле | &#127482;&#127480; All settings and API key in file

`apps/magcore-app-youtube/3.0.13/youtube.php`

## &#127479;&#127482; Обязательные действия | &#127482;&#127480; Mandatory actions
- &#127479;&#127482; Поменять ключ `API_KEY` на свой | &#127482;&#127480; Change your `API_KEY` ([Google Developer Console](https://console.developers.google.com))
- &#127479;&#127482; &#127482;&#127480; **chmod 777** `apps/magcore-app-youtube/3.0.13/cache/`

## &#127479;&#127482; Необязательные действия | &#127482;&#127480; Optional actions
### &#127482;&#127480; English localization by default
- If you want by default English interface and keyboard then change `DEFAULT_LANGUAGE_ENGLISH` to __true__ in `apps/magcore-app-youtube/3.0.13/js/release.js`
- Trending and search localization settings in `apps/magcore-app-youtube/3.0.13/youtube.php`

### &#127479;&#127482; Поиск через API (если ключ с большой квотой) | &#127482;&#127480; Search with API (if key has big quota)
- Поменять `API_SEARCH` на __true__ | &#127482;&#127480; Change `API_SEARCH` to __true__

### &#127479;&#127482; Логирование поиска в папку .../logs/ | &#127482;&#127480; Logging search queries in folder .../logs/
- &#127479;&#127482; Поменять `SEARCH_LOGS` на __true__ | &#127482;&#127480; Change `SEARCH_LOGS` to __true__
- &#127479;&#127482; &#127482;&#127480; **chmod 777** `apps/magcore-app-youtube/3.0.13/logs/`

## &#127479;&#127482; Что нового:
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