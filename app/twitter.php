<?php

/* Getting a JSON Twitter Feed
   ==========================================================================

   1. Sign in as a developer at https://dev.twitter.com/

   2. Click "Create a new application" at https://dev.twitter.com/apps

   3. Under Application Details, find the OAuth settings and the access token
*/

$consumerKey = '7Heg6f9jqSkPCvkClxkiKw';
$consumerSecret = '2u8Gqjp7GAvw63Y363MwbsrTAfSzufEodqljBBPLRM';
$accessToken = '1575-U755K1FvwFdc7kodxwUSUyh00j0uKqW9eKsjCZ2CPv7kf';
$accessTokenSecret = 'eSJ8qXFtYrYfMn5IghkdolyiyaPi2xNNbEvGmoMGD2Lm2';

/* Configuring a JSON Twitter Feed
   ==========================================================================

   1. Find the desired twitter username

   2. Set the maximum number of tweets to retrieve

   3. Set the seconds to wait between caching the response
*/

$username = 'starwars';
$maximum = 10;
$caching = 60;

/* Enjoying a JSON Twitter Feed
   ==========================================================================

   Visit this URL and make sure everything is working

   Use JSONP by adding ?callback=YOUR_FUNCTION to this URL

   Tweet love or hate @jon_neal

   Permission errors? http://stackoverflow.com/questions/4917811/file-put-contents-permission-denied
*/

$filename = basename(__FILE__, '.php').'.json';
$filetime = file_exists($filename) ? filemtime($filename) : time() - $caching - 1;

if (time() - $caching > $filetime) {
    $url = 'https://api.twitter.com/1.1/search/tweets.json';
    $base = 'GET&'.rawurlencode($url).'&'.rawurlencode("count={$maximum}&oauth_consumer_key={$consumerKey}&oauth_nonce={$filetime}&oauth_signature_method=HMAC-SHA1&oauth_timestamp={$filetime}&oauth_token={$accessToken}&oauth_version=1.0&q=#StarWars");
    $key = rawurlencode($consumerSecret).'&'.rawurlencode($accessTokenSecret);
    $signature = rawurlencode(base64_encode(hash_hmac('sha1', $base, $key, true)));
    $oauth_header = "oauth_consumer_key=\"{$consumerKey}\", oauth_nonce=\"{$filetime}\", oauth_signature=\"{$signature}\", oauth_signature_method=\"HMAC-SHA1\", oauth_timestamp=\"{$filetime}\", oauth_token=\"{$accessToken}\", oauth_version=\"1.0\", ";

    $curl_request = curl_init();
    curl_setopt($curl_request, CURLOPT_HTTPHEADER, array("Authorization: Oauth {$oauth_header}", 'Expect:'));
    curl_setopt($curl_request, CURLOPT_HEADER, false);
    curl_setopt($curl_request, CURLOPT_URL, $url."?screen_name={$username}&count={$maximum}");
    curl_setopt($curl_request, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl_request, CURLOPT_SSL_VERIFYPEER, false);
    $response = curl_exec($curl_request);
    curl_close($curl_request);

    file_put_contents($filename, $response);
} else {
    $response = file_get_contents($filename);
}

header('Content-Type: application/json');
header('Last-Modified: '.gmdate('D, d M Y H:i:s', $filetime).' GMT');

print($_GET['callback'] ? $_GET['callback'].'('.$response.')' : $response);
