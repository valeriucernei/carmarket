<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__.'/api/clients/CDNClient.class.php';
/*
use Aws\S3\S3Client;

$client = new Aws\S3\S3Client([
    'version' => 'latest',
    'region' => 'fra1',
    'endpoint' => 'https://fra1.digitaloceanspaces.com',
    'credentials' => [
        'key' => "CLXDZS24AL6KDVDGCG33",
        'secret' => "9al/BuSCGmdkK8DZMh5sk5ooJLYnbXJGbiV/kVSoaSY"
    ]
]);
/*
$response = $client->createBucket([
    'Bucket' => 'web-ibu'
]);

print_r($client);

$spaces = $client->listBuckets();
foreach($spaces['Buckets'] as $space){
    echo $space['Name']."\n";

    //print_r(base64_encode($image_content));

    //echo '<img src="data:image/png;base64, '.base64_encode($image_content).'" alt="ceva" />';
}*/

$image_content = file_get_contents('img.jpg');
print_r(base64_encode($image_content));

$client = new CDNClient();
$url = $client->upload("teslabinary.png", base64_encode($image_content));

print_r($url);





?>
