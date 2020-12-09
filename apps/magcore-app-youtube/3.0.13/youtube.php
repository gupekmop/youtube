<?php
$CFG = [
    "index" => [
        "maxResults" => 50, //кол-во видео на главной [1-50]
        "regionCode" => "RU", //по какому региону искать тренды, RU - Россия, UA - Украина, BY - Беларусь (другие страны смотреть ISO 3166-1 alpha-2)
        "hl" => "ru-RU",
    ],
    "search" => [
        "maxResults" => 50, //кол-во видео в поиске [1-50]
        "regionCode" => "RU", //по какому региону поиск, RU - Россия, UA - Украина, BY - Беларусь (другие страны смотреть ISO 3166-1 alpha-2)
        "hl" => "ru-RU",
    ],
];

$KEYS_INDEX = [ //ключи для трендов (из расчета 1 ключ на 10000 запросов трендов)
    "AIzaSyDjh5DKSn06D1lqhiC6-Zyn1hDtnt6iMKU",
];

$KEYS_SEARCH = [ //ключи для поиска (из расчета 1 ключ на 99 запросов поиска)
    "AIzaSyDjh5DKSn06D1lqhiC6-Zyn1hDtnt6iMKU",
];

function youtube($url)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, $url);
    $result = curl_exec($ch);
    curl_close($ch);
    return $result;
}

header("Content-type: application/json; charset=utf-8");

if (isset($_GET["search"])) {
    $index = intval(file_get_contents("youtube.key"));
    if (++$index >= count($KEYS_SEARCH)) {
        $index = 0;
    }
    file_put_contents("youtube.key", $index);

    $url = "https://www.googleapis.com/youtube/v3/search" .
        "?key=" . $KEYS_SEARCH[$index] .
        "&part=snippet" .
        "&maxResults=" . $CFG["search"]["maxResults"] .
        "&order=relevance" .
        "&q=" . rawurlencode($_GET["search"]) .
        "&regionCode=" . $CFG["search"]["regionCode"] .
        "&type=video";

    if (isset($_GET["pageToken"])) {
        $url .= "&pageToken=" . $_GET["pageToken"];
    }

    $json = youtube($url);
    $arr = json_decode($json, true);

    if (isset($arr["items"]) && count($arr["items"])) {
        unset($json);
        $ids = [];

        foreach ($arr["items"] as $item) {
            $ids[] = $item["id"]["videoId"];
        }
        unset($arr);

        $url = "https://www.googleapis.com/youtube/v3/videos" .
            "?key=" . $KEYS_SEARCH[$index] .
            "&id=" . implode(",", $ids) .
            "&hl=" . $CFG["search"]["hl"] .
            "&part=snippet,contentDetails,statistics";

        echo youtube($url);
    } else {
        echo $json;
    }
} else {
    $url = "https://www.googleapis.com/youtube/v3/videos" .
        "?key=" . $KEYS_INDEX[intval(date("G")) % count($KEYS_INDEX)] .
        "&chart=mostPopular" .
        "&maxResults=" . $CFG["index"]["maxResults"] .
        "&regionCode=" . $CFG["index"]["regionCode"] .
        "&hl=" . $CFG["index"]["hl"] .
        "&part=snippet,contentDetails,statistics";

    if (isset($_GET["pageToken"])) {
        $url .= "&pageToken=" . $_GET["pageToken"];
    }

    echo youtube($url);
}