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
- &#127479;&#127482; Поменять `API_SEARCH` на __true__ | &#127482;&#127480; Change `API_SEARCH` to __true__

### &#127479;&#127482; Логирование поиска в папку .../logs/ | &#127482;&#127480; Logging search queries in folder .../logs/
- &#127479;&#127482; Поменять `SEARCH_LOGS` на __true__ | &#127482;&#127480; Change `SEARCH_LOGS` to __true__
- &#127479;&#127482; &#127482;&#127480; **chmod 777** `apps/magcore-app-youtube/3.0.13/logs/`

## &#127479;&#127482; Что нового:
#### 26.06.2023
- Исправление