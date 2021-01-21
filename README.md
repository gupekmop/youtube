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
#### 21.01.2021
- Рефакторинг release.js
- Отключена арабская раскладка
- Оставлено воспроизведение только через javascript

#### 18.01.2021
- Если в поиске найдется канал без видео, то в строке под кол-вом подписчиков будет не пустая строка, а строка "Нет видео"

#### 15.01.2021
- Столкнулись с проблемой: при получении ссылок на видео через php (т.е. по сути вашим сервером), ютуб блокирует возможность парсинга страницы из-за большого кол-ва запросов с одного ip (просит ввести капчу на странице), поэтому возвращено получение ссылок через javascript (т.е. по сути устройством абонента)