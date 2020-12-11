<?php
define("API_SEARCH", false); //true - для поиска через API
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

$KEYS_INDEX = [ //ключ для трендов
    "AIzaSyDjh5DKSn06D1lqhiC6-Zyn1hDtnt6iMKU",
];

$KEYS_SEARCH = [ //ключ для поиска
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
    if (defined("API_SEARCH") && API_SEARCH === true) {
        //=========================================== API =============================================

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
        //=========================================== PARSING =============================================

        function parseVideoRenderer($videoRenderer)
        {
            $duration = isset($videoRenderer["lengthText"]["simpleText"]) ? $videoRenderer["lengthText"]["simpleText"] : "";

            if ($duration) {
                $publishedAt = isset($videoRenderer["publishedTimeText"]["simpleText"]) ? $videoRenderer["publishedTimeText"]["simpleText"] : "";
                $viewCount = "";

                if (isset($videoRenderer["viewCountText"]["simpleText"])) {
                    $viewCount = $videoRenderer["viewCountText"]["simpleText"];
                } else if (isset($videoRenderer["viewCountText"]["runs"][0]["text"])) {
                    $viewCount = $videoRenderer["viewCountText"]["runs"][0]["text"];
                }

                return [
                    "id" => $videoRenderer["videoId"],
                    "snippet" => [
                        "publishedAt" => $publishedAt,
                        "channelId" => $videoRenderer["longBylineText"]["runs"][0]["navigationEndpoint"]["browseEndpoint"]["browseId"],
                        "title" => $videoRenderer["title"]["runs"][0]["text"],
                        "channelTitle" => $videoRenderer["longBylineText"]["runs"][0]["text"],
                        "thumbnails" => $videoRenderer["thumbnail"]["thumbnails"],
                    ],
                    "contentDetails" => [
                        "duration" => $duration,
                        "realDuration" => "",
                        "dimension" => "",
                        "definition" => "",
                    ],
                    "statistics" => [
                        "viewCount" => $viewCount,
                        "likeCount" => "",
                        "dislikeCount" => "",
                    ],
                ];
            }

            return false;
        }

        $html = file_get_contents("https://www.youtube.com/results?search_query=" . rawurlencode($_GET["search"]));
        $json = [];

        if ($html !== false && preg_match("/ytInitialData = ({.+});/", $html, $ytInitialData)) {
            unset($html);
            $ytInitialData = json_decode($ytInitialData[1], true);
            $contents = $ytInitialData["contents"]["twoColumnSearchResultsRenderer"]["primaryContents"]["sectionListRenderer"]["contents"];
            unset($ytInitialData);

            foreach ($contents as $content) {
                if (isset($content["itemSectionRenderer"]["contents"])) {
                    foreach ($content["itemSectionRenderer"]["contents"] as $video) {
                        if (isset($video["videoRenderer"])) {
                            if (($item = parseVideoRenderer($video["videoRenderer"])) !== false) {
                                $json["items"][] = $item;
                            }
                        } else if (isset($video["shelfRenderer"]["content"]["verticalListRenderer"]["items"])) {
                            foreach ($video["shelfRenderer"]["content"]["verticalListRenderer"]["items"] as $shelf) {
                                if (isset($shelf["videoRenderer"])) {
                                    if (($item = parseVideoRenderer($shelf["videoRenderer"])) !== false) {
                                        $json["items"][] = $item;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            //echo "<pre>";
            //echo $json);
            //echo "</pre>";

            //echo "<pre>";
            //print_r($contents);
            //echo "</pre>";
        }

        echo json_encode($json, JSON_UNESCAPED_UNICODE);
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