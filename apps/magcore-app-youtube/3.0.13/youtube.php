<?php
define("API_KEY", "AIzaSyDjh5DKSn06D1lqhiC6-Zyn1hDtnt6iMKU"); //ключ / key Youtube Data API
define("API_SEARCH", false); //true - для поиска через API / for searching with API
define("SEARCH_LOGS", false); //true - логировать поисковые запросы в папку logs / logging search requests to logs folder

$CFG = [
    "index" => [
        "cacheTime" => 15, //кол-во минут кеширования трендов на стороне сервера / trending caching in minutes on server side
        "maxResults" => 50, //кол-во видео на главной / video count for trending [1-50]
        "regionCode" => "RU", //по какому региону искать тренды / region for trending, RU - Россия, UA - Украина, BY - Беларусь (другие страны смотреть ISO 3166-1 alpha-2)
        "hl" => "ru-RU",
    ],
    "search" => [
        "maxResults" => 50, //кол-во видео в поиске / video count for searching [1-50]
        "regionCode" => "RU", //по какому региону поиск / region for searching, RU - Россия, UA - Украина, BY - Беларусь (другие страны смотреть ISO 3166-1 alpha-2)
        "hl" => "ru-RU",
    ],
    "novideos" => "Нет видео", //текст для каналов без загруженных видео / text for channels without videos
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
    if (defined("SEARCH_LOGS") && SEARCH_LOGS === true) {
        file_put_contents("logs/" . date("Ymd") . ".log", date("H:i:s") . " - " . $_SERVER["REMOTE_ADDR"] . " - " . rawurldecode($_GET["search"]) . "\n", FILE_APPEND | LOCK_EX);
    }
    if (defined("API_SEARCH") && API_SEARCH === true) {
        //=========================================== API =============================================

        $url = "https://www.googleapis.com/youtube/v3/search" .
            "?key=" . API_KEY .
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
                "?key=" . API_KEY .
                "&id=" . implode(",", $ids) .
                "&hl=" . $CFG["search"]["hl"] .
                "&part=snippet,contentDetails,statistics";

            echo youtube($url);
        } else {
            echo $json;
        }
    } else {
        //=========================================== PARSING =============================================
        //=========================================== CHANNEL =============================================
        if (preg_match("/^\/(user|channel|c)\//", $_GET["search"])) {
            $html = file_get_contents("https://www.youtube.com" . $_GET["search"] . "/videos");

            if (preg_match_all('/"gridVideoRenderer":{"videoId":"([^"]+)"/', $html, $videoId)) {
                unset($html);

                $url = "https://www.googleapis.com/youtube/v3/videos" .
                    "?key=" . API_KEY .
                    "&id=" . implode(",", $videoId[1]) .
                    "&hl=" . $CFG["index"]["hl"] .
                    "&part=snippet,contentDetails,statistics";
                echo youtube($url);
            } else {
                echo json_encode([]);
            }
        } else {
            //=========================================== SEARCH =============================================
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

            function parseChannelRenderer($channelRenderer)
            {
                global $CFG;
                $videoCount = $CFG["novideos"];
                if (isset($channelRenderer["videoCountText"])) {
                    $videoCount = $channelRenderer["videoCountText"]["runs"][0]["text"] . $channelRenderer["videoCountText"]["runs"][1]["text"];
                }
                return [
                    "id" => "",
                    "canonicalBaseUrl" => $channelRenderer["longBylineText"]["runs"][0]["navigationEndpoint"]["browseEndpoint"]["canonicalBaseUrl"],
                    "snippet" => [
                        "publishedAt" => "",
                        "channelId" => $channelRenderer["channelId"],
                        "title" => $channelRenderer["title"]["simpleText"],
                        "channelTitle" => $channelRenderer["subscriberCountText"]["simpleText"], //subscribers count
                        "thumbnails" => $channelRenderer["thumbnail"]["thumbnails"],
                    ],
                    "contentDetails" => [
                        "duration" => "",
                        "realDuration" => "",
                        "dimension" => "",
                        "definition" => "",
                    ],
                    "statistics" => [
                        "viewCount" => $videoCount, //video count
                        "likeCount" => "",
                        "dislikeCount" => "",
                    ],
                ];
            }

            $html = file_get_contents("https://www.youtube.com/results?search_query=" . rawurlencode($_GET["search"]));
            $json = [];

            if ($html !== false && preg_match("/ytInitialData = ({.+?});/", $html, $ytInitialData)) {
                //$json["ytInitialData"] = $ytInitialData[1];
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
                            } else if (isset($video["channelRenderer"])) {
                                $json["items"][] = parseChannelRenderer($video["channelRenderer"]);
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
                //print_r($json);
                //echo "</pre>";

                //echo "<pre>";
                //print_r($contents);
                //echo "</pre>";
            }

            echo json_encode($json, JSON_UNESCAPED_UNICODE);
        }
    }
} else if (isset($_GET["v"])) {
    function decipher($arr, $a)
    {
        $a = str_split($a);

        foreach ($arr as $do) {
            if ($do === "r") {
                $a = array_reverse($a);
            } else if ($do[0] === "c") {
                $do = intval(substr($do, 1));
                $c = $a[0];
                $a[0] = $a[$do % count($a)];
                $a[$do % count($a)] = $c;
            } else if ($do[0] === "s") {
                $do = intval(substr($do, 1));
                array_splice($a, 0, $do);
            }
        }

        return implode("", $a);
    }

    function getBase($script)
    {
        $res = [];
        $script = file_get_contents($script);
        if (preg_match('/a=a\.split\(""\);(.+?);return a\.join\(""\)/', $script, $functions)) {
            $functions = explode(";", $functions[1]);

            foreach ($functions as $function) {
                if (preg_match('/[\w\d]+\.([\w\d]+)\(a,(\d+)\)/', $function, $func)) {
                    if (preg_match('/' . $func[1] . ':function\(a\){a\.reverse\(\)}/', $script)) {
                        $res[] = "r";
                    } else if (preg_match('/' . $func[1] . ':function\(a,b\){var c=a\[0];a\[0]=a\[b%a\.length];a\[b%a\.length]=c}/', $script)) {
                        $res[] = "c" . $func[2];
                    } else if (preg_match('/' . $func[1] . ':function\(a,b\){a\.splice\(0,b\)}/', $script)) {
                        $res[] = "s" . $func[2];
                    } else {
                        $res[] = "u:" . $func[0];
                    }
                }
            }
        }
        return $res;
    }

    $html = file_get_contents("https://www.youtube.com/watch?v=" . $_GET["v"]);

    $formats = [];
    if (preg_match('/"formats(.?)":(\[[^]]+])/', $html, $match)) {
        if (strlen($match[1])) {
            $match[2] = stripslashes($match[2]);
        }
        if (is_array($merge = json_decode($match[2], true))) {
            $formats = array_merge($formats, $merge);
        }
    }
    //if (preg_match('/"adaptiveFormats(.?)":(\[[^]]+])/', $html, $match)) {
    //    if (strlen($match[1])) {
    //        $match[2] = stripslashes($match[2]);
    //    }
    //    if (is_array($merge = json_decode($match[2], true))) {
    //        $formats = array_merge($formats, $merge);
    //    }
    //}

    $id = -1;
    $width = 0;
    $url = "";
    $mimeType = "";
    $qualityLabel = "";
    $license = false;

    foreach ($formats as $key => $format) {
        if (preg_match('/^video\/(mp4|3gpp);/', $format["mimeType"]) && isset($format["audioChannels"], $format["width"]) && $width < $format["width"]) {
            $id = $key;
            $width = $format["width"];
        }
    }

    if ($id >= 0) {
        if (isset($formats[$id]["url"])) {
            $url = urldecode($formats[$id]["url"]);
            $mimeType = $formats[$id]["mimeType"];
            $qualityLabel = $formats[$id]["qualityLabel"];
        } else if (isset($formats[$id]["signatureCipher"]) && preg_match('/"jsUrl":"([^"]+)"/', $html, $js)) {
            $js = $js[1];
            $cache_js = str_replace("/", "_", $js);
            $cache_js = str_replace(".", "_", $cache_js);

            if (($modify = @file("cache/" . $cache_js)) === false) {
                $modify = getBase("https://www.youtube.com" . $js);
                file_put_contents("cache/" . $cache_js, implode("\n", $modify), FILE_APPEND | LOCK_EX);
            } else {
                $modify = array_map("trim", $modify);
            }

            $signatureCipher = explode("&", $formats[$id]["signatureCipher"]);

            $cipher = urldecode(substr($signatureCipher[0], 2));
            $decipher = decipher($modify, $cipher);
            $url = urldecode(substr($signatureCipher[2], 4));
            $url .= "&sig=" . $decipher;
            $mimeType = $formats[$id]["mimeType"];
            $qualityLabel = $formats[$id]["qualityLabel"];
            $license = true;
        }
    }
    echo json_encode(["id" => $id, "url" => $url, "mimeType" => $mimeType, "qualityLabel" => $qualityLabel, "width" => $width, "license" => $license]);
} else {
    $filename = "cache/trending" . (isset($_GET["pageToken"]) ? "_" . $_GET["pageToken"] : "") . ".json";
    if (($time = filemtime($filename)) !== false && time() - $time < $CFG["index"]["cacheTime"] * 60 && filesize($filename) > 0) {
        echo file_get_contents($filename);
    } else {
        $url = "https://www.googleapis.com/youtube/v3/videos" .
            "?key=" . API_KEY .
            "&chart=mostPopular" .
            "&maxResults=" . $CFG["index"]["maxResults"] .
            "&regionCode=" . $CFG["index"]["regionCode"] .
            "&hl=" . $CFG["index"]["hl"] .
            "&part=snippet,contentDetails,statistics";

        if (isset($_GET["pageToken"])) {
            $url .= "&pageToken=" . $_GET["pageToken"];
        }

        $json = youtube($url);
        file_put_contents($filename, $json);
        echo $json;
    }
}