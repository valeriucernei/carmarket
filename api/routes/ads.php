<?php

/**
 * API Add new ad in Data Base, and return ad ID
 * @var [type]
 */
Flight::route('POST /ads/add', function(){
    $data = Flight::request()->data->getData();
    Flight::json(Flight::userservice()->add($data));
});


?>
